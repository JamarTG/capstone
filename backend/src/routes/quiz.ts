import express from "express";
import {
  createQuizSession,
  getQuizSession,
  answerQuizQuestion,
  deleteQuizSession,
  getUserQuizSessions
} from "../controllers/quiz";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.get("/all", verifyToken, getUserQuizSessions)

router.post("/create", verifyToken, createQuizSession);

router.get("/:sessionId", getQuizSession);

router.patch("/:sessionId/answer", answerQuizQuestion);

router.delete("/:sessionId", deleteQuizSession);

export default router;
