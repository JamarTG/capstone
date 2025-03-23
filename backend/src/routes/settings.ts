import {Router} from "express";
import { verifyToken } from "../middleware/auth";
import { updateUserInformation } from "../controllers/settings";

const router = Router()

router.put("/update-user-info",verifyToken,updateUserInformation) 

export default router;