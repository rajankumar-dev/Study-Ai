import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { generateQuestions } from "../controllers/question.controller.js";

const router = express.Router();

router.post("/generate", authMiddleware, generateQuestions);

export default router;
