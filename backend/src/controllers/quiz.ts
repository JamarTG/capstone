import { Request, Response } from "express";
import { Quiz } from "../models/Quiz";
import { CustomRequest } from "../types/middleware";
import { UserAnswer } from "../models/UserAnswer";
import { Objective } from "../models/Objective";
import { spawn } from "child_process";
import { IQuestion } from "../types/model";

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
    const userId = "507f1f77bcf86cd799439011"

    const questions:IQuestion[] = await new Promise<any>((resolve, reject) => {
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

    console.log()

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
    const sessions = await Quiz.find({ user: req.user._id }).sort({ startTime: -1 }).populate("topic").populate("questions.questionId");

    res.status(200).json({
      message: "User quiz sessions fetched successfully",
      sessions,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user quiz sessions" });
  }
};
/*
export const submitQuizAnswer = async (req: CustomRequest, res: Response) => {
  try {
    const quiz = req.params.sessionId;
    const { question, selectedOption } = req.body;
    const user = req.user.id;

    const fetchedQuiz = await Quiz.findById({ _id: quiz });
    if (!fetchedQuiz) {
      res.status(404).json({ message: "Quiz not found." });
      return;
    }

    if (fetchedQuiz.completed) {
      res.status(409).json({ message: "Quiz Already Taken" });
      return;
    }

    const fetchedQuestion = await Question.findById({ _id: question });
    if (!fetchedQuestion) {
      res.status(404).json({ message: "Question not found." });
      return;
    }

    const isCorrect = selectedOption === fetchedQuestion.correctAnswer;

    const existingAnswer = await UserAnswer.findOneAndUpdate(
      { user, quiz, question },
      { selectedOption, isCorrect, answeredAt: new Date() },
      { new: true, upsert: true }
    );

    fetchedQuiz.currentQuestionIndex += 1;
    if (isCorrect) {
      fetchedQuiz.score = (fetchedQuiz.score || 0) + 1;
    }

    if (fetchedQuiz.currentQuestionIndex >= fetchedQuiz.questions.length) {
      fetchedQuiz.completed = true;
    }

    await fetchedQuiz.save();

    res.status(200).json({
      message: "Answer submitted successfully.",
      data: existingAnswer,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error ${error}` });
    return;
  }
};*/

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
