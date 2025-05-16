import { Request, Response } from "express";
import { IQuestion, Quiz } from "../models/Quiz";
import { CustomRequest } from "../types/middleware";
import { spawn } from "child_process";
import Feedback from "../models/Feedback";

export const checkActiveQuizSession = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user?._id) {
      res.status(401).json({
        success: false,
        error: "Authentication required",
      });
      return;
    }

    const activeSession = await Quiz.findOne(
      {
        user: req.user._id,
        completed: false,
      },
      { _id: 1 }
    );

    if (!activeSession) {
      res.status(200).json({
        success: true,
        data: {
          hasActiveSession: false,
          sessionId: null,
        },
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        hasActiveSession: true,
        sessionId: activeSession._id,
      },
    });
    return;
  } catch (error) {
    console.error("Error checking active quiz session:", error);
    res.status(500).json({
      success: false,
      error: "Failed to check for active quiz session",
    });
    return;
  }
};

export const testGenerateQuestion = async (req: Request, res: Response) => {
  try {
    const { section, feedback } = req.body;

    const question = await new Promise<any>((resolve, reject) => {
      const py = spawn("python", ["./rag/main.py", String(section)]);

      let data = "";
      let error = "";

      py.stdout.on("data", (chunk) => (data += chunk));
      py.stderr.on("data", (chunk) => (error += chunk));

      py.on("close", (code) => {
        if (code === 0) {
          try {
            const parsed = JSON.parse(data);
            resolve(parsed);
          } catch (err) {
            reject(`Failed to parse JSON: ${err}`);
          }
        } else {
          reject(`Python script failed with code ${code}:\n${error}`);
        }
      });

      py.stdin.write(JSON.stringify({ feedback }));
      py.stdin.end();
    });

    res.status(200).json({ success: true, data: question });
  } catch (err) {
    res.status(500).json({ success: false, error: `${err}` });
  }
};

export const createQuizSession = async (req: CustomRequest, res: Response) => {
  try {
    const section = req.body.section;
    const userId = req.user._id;

    const feedbackDocs = await Feedback.find({ user: userId, section });

    const feedback = feedbackDocs.map((doc) => ({
      feedbackText: doc.feedback,
    }));

    const result = await new Promise<any>((resolve, reject) => {
      const py = spawn("python", ["./rag/main.py", String(section)]);

      let data = "";
      let error = "";

      py.stdout.on("data", (chunk) => (data += chunk));
      py.stderr.on("data", (chunk) => (error += chunk));

      py.on("close", (code) => {
        if (code === 0) {
          try {
            const parsed = JSON.parse(data);
            resolve(parsed);
          } catch (err) {
            reject(`Failed to parse JSON: ${err}`);
          }
        } else {
          reject(`Python script failed with code ${code}:\nError: ${error || "No error message"}\nOutput: ${data || "No output received"}`);
        }
      });

      py.stdin.write(JSON.stringify({ feedback }));
      py.stdin.end();
    });

    const questions: IQuestion[] = Array.isArray(result) ? result : [result];

    if (!questions || questions.length === 0) {
      res.status(400).json({ error: "No questions generated for the selected topic." });
      return;
    }

    const questionsWithFeedbackId = questions.map((question, index) => {
      return feedback.length > 0 && index < feedback.length
        ? {
            ...question,
            feedbackId: feedbackDocs[index]?._id,
          }
        : question;
    });

    const newSession = await Quiz.create({
      section,
      user: userId,
      questions: questionsWithFeedbackId,
      currentQuestionIndex: 0,
      score: 0,
      startTime: new Date(),
      completed: false,
    });

    res.status(201).json({
      message: "Quiz session created successfully",
      session: newSession,
    });
  } catch (err) {
    res.status(500).json({ error: `Failed to create session: ${err}` });
  }
};

export const getQuizSession = async (req: Request, res: Response) => {
  try {
    const session = await Quiz.findById(req.params.sessionId);

    if (!session) {
      res.status(404).json({ error: "Session not found" });
      return;
    }

    res.status(200).json({
      message: "Session retrieved successfully",
      session,
    });
  } catch (err) {
    res.status(500).json({ error: `Failed to retrieve sessionaa ${err}` });
  }
};

export const deleteQuizSession = async (req: Request, res: Response) => {
  try {
    await Quiz.findByIdAndDelete(req.params.sessionId);
    res.status(200).json({ message: "Quiz session deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete session" });
  }
};

export const getUserQuizSessions = async (req: CustomRequest, res: Response) => {
  try {
    const sessions = await Quiz.find({ user: req.user._id }).sort({ startTime: -1 });

    res.status(200).json({
      message: "User quiz sessions fetched successfully",
      sessions,
    });
  } catch (err) {
    res.status(500).json({ error: `Failed to fetch user quiz sessions: ${err}` });
  }
};

export const submitQuizAnswer = async (req: CustomRequest, res: Response) => {
  try {
    const quiz = req.params.sessionId;
    const { is_correct, selectedOption } = req.body;

    const fetchedQuiz = await Quiz.findById({ _id: quiz });
    if (!fetchedQuiz) {
      res.status(404).json({ message: "Quiz not found." });
      return;
    }

    if (fetchedQuiz.completed) {
      res.status(409).json({ message: "Quiz Already Taken" });
      return;
    }

    const currentIndex = fetchedQuiz.currentQuestionIndex;
    const currentQuestion = fetchedQuiz.questions[currentIndex];
    currentQuestion.user_answer = selectedOption;

    if (is_correct) {
      fetchedQuiz.score = (fetchedQuiz.score || 0) + 1;
      currentQuestion.is_correct = true;

      if (currentQuestion.feedbackId) {
        await Feedback.findByIdAndDelete(currentQuestion.feedbackId);
        currentQuestion.feedbackId = undefined;
      }
    } else {
      currentQuestion.is_correct = false;

      if (!currentQuestion.feedbackId) {
        const questionText = currentQuestion.question;
        const section = String(fetchedQuiz.section);
        const actionFlag = "feedback";
        const python = spawn("python", ["./rag/main.py", section, actionFlag]);

        python.stdin.write(JSON.stringify({ feedback: [{ Feedback: questionText }] }));
        python.stdin.end();

        let data = "";

        python.stdout.on("data", (chunk) => {
          data += chunk.toString();
        });

        python.stderr.on("data", (err) => {
          console.error("Python error:", err.toString());
        });

        python.on("close", async () => {
          try {
            if (!data) {
              console.error("No feedback data received from Python script.");
              return;
            }

            const feedback = JSON.parse(data);
            if (feedback.Feedback) {
              const createdFeedback = await Feedback.create({
                user: req.user._id,
                feedback: feedback.Feedback,
                section,
              });

              await Quiz.updateOne(
                { _id: quiz, "questions._id": currentQuestion._id },
                { $set: { "questions.$.feedbackId": createdFeedback._id } }
              );

              createdFeedback.save();
            }
          } catch (error) {
            console.error("Failed to process feedback:", error);
          }
        });
      }
    }

    fetchedQuiz.markModified(`questions.${currentIndex}`);
    fetchedQuiz.currentQuestionIndex += 1;
    if (fetchedQuiz.currentQuestionIndex >= fetchedQuiz.questions.length) {
      fetchedQuiz.completed = true;
    }
    await fetchedQuiz.save();

    res.status(200).json({
      message: "Answer submitted successfully.",
      currentIndex,
      is_correct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error ${error}` });
  }
};

export const completeQuiz = async (req: Request, res: Response) => {
  try {
    const quiz = req.params.sessionId;

    const quizData = await Quiz.findById(quiz);
    if (!quizData) {
      res.status(404).json({ message: "Quiz not found" });
      return;
    }

    const currentQuestionIndex = quizData.questions.length;

    const updatedQuiz = await Quiz.findByIdAndUpdate(
      quiz,
      {
        completed: true,
        completedAt: new Date(),
        currentQuestionIndex,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Quiz marked as completed",
      quiz: updatedQuiz,
    });
  } catch (error) {
    console.error("Error completing quiz:", error);
    res.status(500).json({ message: `Failed to complete quiz ${error}` });
  }
};

export const getUserFeedbacks = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user?._id) {
      res.status(401).json({
        success: false,
        error: "Authentication required",
      });
      return;
    }

    const feedbacks = await Feedback.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "User feedbacks retrieved successfully",
      data: feedbacks.map((fb) => ({
        feedback: fb.feedback,
        section: fb.section,
      })),
    });
  } catch (error) {
    console.error("Error getting user feedbacks:", error);
    res.status(500).json({
      success: false,
      error: "Failed to retrieve user feedbacks",
    });
  }
};
