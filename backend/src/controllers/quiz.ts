import { Request, Response } from "express";
import QuizSession from "../models/Quiz";
import { getQuestionsForTopic } from "../utils";
import { CustomRequest } from "../types/middleware";

export const createQuizSession = async (req: CustomRequest, res: Response) => {
  try {
    const { topic } = req.body;
    const { _id } = req.user;

    const newSession = await QuizSession.create({
      topic,
      user: _id,
      currentQuestionIndex: 0,
      score: 0,
      startTime: new Date(),
      completed: false,
    });

    res.status(201).json({
      message: "Quiz session created successfully",
      session: newSession,
    });
    return;
  } catch (err) {
    res.status(500).json({ error: `Failed to create session ${err}` });
    return;
  }
};

export const getQuizSession = async (req: Request, res: Response) => {
  try {
    const session = await QuizSession.findById(req.params.sessionId);
    if (!session) {
      res.status(404).json({ error: "Session not found" });
      return;
    }
    res.status(200).json({
      message: "Session retrieved successfully",
      session,
    });
    return;
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve session" });
    return;
  }
};

export const answerQuizQuestion = async (req: Request, res: Response) => {
  try {
    const session = await QuizSession.findById(req.params.sessionId);
    if (!session || session.completed) {
      res.status(400).json({ error: "Invalid or completed session" });
      return;
    }

    const questions = getQuestionsForTopic(session.topic);
    const currentQuestion = questions[session.currentQuestionIndex];

    const isCorrect = req.body.answerIndex === currentQuestion.correctIndex;
    if (isCorrect) session.score++;

    session.currentQuestionIndex++;
    if (session.currentQuestionIndex >= questions.length) {
      session.completed = true;
      session.endTime = new Date();
    }

    await session.save();

    res.json({
      message: isCorrect ? "Correct answer!" : "Wrong answer!",
      session,
    });
    return;
  } catch (err) {
    res.status(500).json({ error: "Failed to answer question" });
    return;
  }
};

export const deleteQuizSession = async (req: Request, res: Response) => {
  try {
    await QuizSession.findByIdAndDelete(req.params.sessionId);
    res.status(200).json({ message: "Quiz session deleted successfully" });
    return;
  } catch (err) {
    res.status(500).json({ error: "Failed to delete session" });
    return;
  }
};

export const getUserQuizSessions = async (req: CustomRequest, res: Response) => {
  try {
    const user = req.user._id;

    const sessions = await QuizSession.find({user})
      .sort({ startTime: -1 })
      .populate("topic");
    
      if(!user) {
        res.status(404).json({message: "User Not Found"})
      }

    res.status(200).json({
      message: "User quiz sessions fetched successfully",
      sessions,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user quiz sessions" });
  }
};