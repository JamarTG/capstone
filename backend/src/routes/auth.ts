import { Router } from "express";
import * as authControllers from "../controllers/auth";
import verifyToken from "../middleware/verifyToken";
const router = Router();

router.post("/login", authControllers.login);
router.post("/register", authControllers.register);
router.get("/check-auth", verifyToken, authControllers.checkAuth);

export default router;
