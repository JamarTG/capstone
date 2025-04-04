import { Router } from "express";
import { verifyToken } from "../middleware/auth";
import { updateUserInformation, getUserInformation, deleteAccount } from "../controllers/settings";

const router = Router();

router.get("/user-info", verifyToken, getUserInformation);
router.put("/user-info", verifyToken, updateUserInformation);
router.post("/delete-account", verifyToken, deleteAccount);

export default router;
