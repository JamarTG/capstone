import { Router } from "express";
import { checkAuth, login, register } from "../controllers/auth";
import { verifyToken } from "../middleware/auth";
const router = Router();

router.post("/login", login);
router.post("/register", register);
router.get("/check-auth", verifyToken, checkAuth);

export default router;
