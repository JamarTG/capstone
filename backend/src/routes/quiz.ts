import { Router } from "express";
import * as quizControllers from "../controllers/quiz";
import verifyToken from "../middleware/verifyToken";

const router = Router();

router.get("/active", verifyToken, quizControllers.checkActiveQuizSession);
router.get("/all", verifyToken, quizControllers.getUserQuizSessions);
router.get("/feedbacks", verifyToken, quizControllers.getUserFeedbacks);
router.post("/create", verifyToken, quizControllers.createQuizSession);
router.get("/:sessionId", verifyToken, quizControllers.getQuizSession);
router.patch(
  "/:sessionId/answer",
  verifyToken,
  quizControllers.submitQuizAnswer,
);
router.put(
  "/:sessionId/auto-submit",
  verifyToken,
  quizControllers.completeQuiz,
);
router.delete("/:sessionId", quizControllers.deleteQuizSession);

export default router;
