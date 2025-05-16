import { Router } from "express";
import verifyToken from "../middleware/verifyToken";
import * as settingsControllers from "../controllers/settings";

const router = Router();

router.get("/user-info", verifyToken, settingsControllers.getUserInformation);
router.put("/user-info", verifyToken, settingsControllers.updateUserInformation);

export default router;
