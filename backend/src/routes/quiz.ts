import express from "express";
import {
  createQuizSession,
  getQuizSession,
  // answerQuizQuestion,
  completeQuiz,
  deleteQuizSession,
  getUserQuizSessions,
  submitQuizAnswer
} from "../controllers/quiz";
import { verifyToken } from "../middleware/auth";
import { checkActiveQuizSession } from "../controllers/quiz";

const router = express.Router();

router.get("/active", verifyToken, checkActiveQuizSession);
router.get("/all", verifyToken, getUserQuizSessions)
router.post("/create", verifyToken,createQuizSession);
router.get("/:sessionId", verifyToken, getQuizSession);
router.patch("/:sessionId/answer",verifyToken, submitQuizAnswer);
router.delete("/:sessionId", deleteQuizSession);
router.put("/:sessionId/auto-submit", verifyToken, completeQuiz);
// router.post("/test-generate", testGenerateQuestion);

export default router;
