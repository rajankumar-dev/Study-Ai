import express from "express";
import upload from "../config/multer.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { uploadProfilePic } from "../controllers/user.controller.js";

const router = express.Router();

router.post(
  "/profile-pic",
  authMiddleware,
  upload.single("profilePic"),
  uploadProfilePic,
);

export default router;
