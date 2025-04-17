import express from "express";
import {
  createQuizSession,
  getQuizSession,
  // answerQuizQuestion,
  completeQuiz,
  deleteQuizSession,
  getUserQuizSessions,
  submitQuizAnswer,
  testGenerateQuestion
} from "../controllers/quiz";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.get("/all", verifyToken, getUserQuizSessions)
router.post("/create", verifyToken, createQuizSession);
router.get("/:sessionId", getQuizSession);
router.patch("/:sessionId/answer",verifyToken, submitQuizAnswer);
router.delete("/:sessionId", deleteQuizSession);
router.put("/:sessionId/auto-submit", verifyToken, completeQuiz);

router.post("/test-generate", testGenerateQuestion);

export default router;
