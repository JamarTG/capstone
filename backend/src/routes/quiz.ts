import express from "express";
import {
  createQuizSession,
  getQuizSession,
  completeQuiz,
  deleteQuizSession,
  getUserQuizSessions,
  submitQuizAnswer,
  getUserFeedbacks
} from "../controllers/quiz";
import { verifyToken } from "../middleware/auth";
import { checkActiveQuizSession } from "../controllers/quiz";

const router = express.Router();

router.get("/active", verifyToken, checkActiveQuizSession);
router.get("/all", verifyToken, getUserQuizSessions)
router.get("/feedbacks", verifyToken, getUserFeedbacks);
router.post("/create", verifyToken,createQuizSession);
router.get("/:sessionId", verifyToken, getQuizSession);
router.patch("/:sessionId/answer",verifyToken, submitQuizAnswer);
router.put("/:sessionId/auto-submit", verifyToken, completeQuiz);
router.delete("/:sessionId", deleteQuizSession);


export default router;
