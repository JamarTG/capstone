import express from "express";
import { getTopics } from "../controllers/topics";

const router = express.Router();


// router.post("/", seedTopics);
router.get("/", getTopics);

export default router;