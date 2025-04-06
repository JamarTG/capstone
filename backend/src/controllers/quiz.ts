import { Request, Response } from "express";
import { Quiz } from "../models/Quiz";
import { Question } from "../models/Question";
import { CustomRequest } from "../types/middleware";
import { UserAnswer } from "../models/UserAnswer";
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
      const result = await Question.aggregate([{ $match: { objective: obj._id } }, { $sample: { size: 1 } }]);

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
};

export const completeQuiz = async (req: Request, res: Response) => {
  try {
    const quiz = req.params.sessionId;

    const updatedQuiz = await Quiz.findByIdAndUpdate(
      quiz,
      {
        completed: true,
        completedAt: new Date(),
      },
      { new: true }
    );

    if (!updatedQuiz) {
      res.status(404).json({ message: "Quiz not found" });
      return;
    }

    res.status(200).json({
      message: "Quiz marked as completed",
      quiz: updatedQuiz,
    });
  } catch (error) {
    console.error("Error completing quiz:", error);
    res.status(500).json({ message: "Failed to complete quiz" });
  }
};
