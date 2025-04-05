import { Request, Response } from "express";
import { Quiz } from "../models/Quiz";
import { Question } from "../models/Question";
import { CustomRequest } from "../types/middleware";
import { Types } from "mongoose";
import { Objective } from "../models/Objective";

export const createQuizSession = async (req: CustomRequest, res: Response) => {
  try {
    console.log("➡️ Incoming createQuizSession request:", req.body);

    const { topic } = req.body;
    const { _id: userId } = req.user;

 
    const objectives = await Objective.find({ topic }).select("_id");
    console.log(`✅ Found ${objectives.length} objectives for topic ${topic}`);

    if (!objectives.length) {
      res.status(400).json({ error: `No objectives found for topic ${topic}` });
      return;
    }

    const questions = [];

    for (const obj of objectives) {
      console.log(`🔍 Searching question for objective ${obj._id}`);
      const result = await Question.aggregate([
        { $match: { objective: obj._id } },
        { $sample: { size: 1 } }, 
      ]);

      if (result.length) {
        console.log(`✅ Found question ${result[0]._id} for objective ${obj._id}`);
        questions.push(result[0]);
      } else {
        console.log(`⚠️ No question found for objective ${obj._id}`);
      }
    }

    if (!questions.length) {
      res.status(400).json({ error: "No questions found for the selected topic." });
      return;
    }

  
    const newSession = await Quiz.create({
      topic,
      user: userId,
      questions: questions.map((q) => ({
        questionId: q._id,
        selectedOption: "",
        isCorrect: false,
      })),
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
  try {
    const session = await Quiz.findById(req.params.sessionId).populate("topic").populate("questions.questionId");

    if (!session) {
      res.status(404).json({ error: "Session not found" });
      return;
    }

    res.status(200).json({
      message: "Session retrieved successfully",
      session,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve session" });
  }
};

export const answerQuizQuestion = async (req: CustomRequest, res: Response) => {
  try {
    const { answer } = req.body;
    const session = await Quiz.findById(req.params.sessionId);

    if (!session || session.completed) {
      res.status(400).json({ error: "Invalid or completed session" });
      return;
    }

    const currentQuestion = await Question.findById(session.questions[session.currentQuestionIndex].questionId);

    if (!currentQuestion) {
      res.status(404).json({ error: "Question not found" });
      return;
    }

    const isCorrect = answer === currentQuestion.correctAnswer;
    session.questions[session.currentQuestionIndex] = {
      questionId: currentQuestion._id as Types.ObjectId, // Explicit type assertion
      selectedOption: answer,
      isCorrect,
      answeredAt: new Date(),
    };

    if (isCorrect) session.score += Math.floor(100 / session.questions.length);

    session.currentQuestionIndex++;
    if (session.currentQuestionIndex >= session.questions.length) {
      session.completed = true;
      session.endTime = new Date();
    }

    await session.save();

    res.json({
      message: isCorrect ? "Correct answer!" : "Wrong answer!",
      session,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to answer question" });
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
