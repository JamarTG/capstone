import { Request, Response } from "express";
import { Quiz } from "../models/Quiz";
import { CustomRequest } from "../types/middleware";
import { UserAnswer } from "../models/UserAnswer";
import { Objective } from "../models/Objective";
import { spawn } from "child_process";
import { IQuestion } from "../types/model";
import { userInfo } from "os";
import Feedback from "../models/Feedback";

export const checkActiveQuizSession = async (req: CustomRequest, res: Response) => {
  console.log("✅ checkActiveQuizSession was hit");

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
      const py = spawn("python", ["./rag/section1.py", String(section)]);

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
    console.log("➡️ Incoming createQuizSession request:", req.body);

    const { section, feedback } = req.body;
    const userId = req.user;

    const questions: IQuestion[] = await new Promise<any>((resolve, reject) => {
      const py = spawn("python", ["./rag/section1.py", String(section)]);

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

    if (!questions || questions.length === 0) {
      res.status(400).json({ error: "No questions generated for the selected topic." });

      return;
    }

    // const formattedQuestions = questions.map((q: any) => ({
    //   questionId: q.question_id,
    //   selectedOption: "",
    //   isCorrect: false,
    // }));

    const newSession = await Quiz.create({
      section,
      user: userId,
      questions,
      currentQuestionIndex: 0,
      score: 0,
      startTime: new Date(),
      completed: false,
    });

    console.log("✅ Quiz session created:", newSession._id);

    res.status(201).json({
      message: "Quiz session created successfully",
      session: newSession,
    });
  } catch (err) {
    console.error("❌ Error creating quiz session:", err);
    res.status(500).json({ error: `Failed to create session: ${err}` });
  }
};

export const getQuizSession = async (req: Request, res: Response) => {
  console.log("⚠️ getQuizSession was hit with sessionId:", req.params.sessionId);
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
    } else {
      currentQuestion.is_correct = false;
    
      const questionText = currentQuestion.question;
      const section = String(fetchedQuiz.section);
      const actionFlag = "feedback"; 
      const python = spawn("python", ["./rag/section1.py", section, actionFlag]);
    
      python.stdin.write(JSON.stringify({ feedback: [{ Feedback: questionText }] }));
      python.stdin.end();
    
      let data = "";
    
      python.stdout.on("data", (chunk) => {
        data += chunk.toString();
        console.log("Received data from Python:", data);
      });
    
      python.stderr.on("data", (err) => {
        console.error("Python error:", err.toString());
      });
    
      python.on("close", async () => {
        if (data) {
          try {
            const parsed = JSON.parse(data);
            const feedbackItem = parsed[0];
    
            if (feedbackItem?.Feedback) {
              await Feedback.create({
                user: req.user._id,
                feedback: feedbackItem.Feedback,
                section: feedbackItem.Section,
              });
            } else {
              console.error("No valid feedback returned from Python script.");
            }
          } catch (error) {
            console.error("Failed to process feedback:", error);
          }
        } else {
          console.error("No feedback data received from Python script.");
        }
      });
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
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error ${error}` });
    return;
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
