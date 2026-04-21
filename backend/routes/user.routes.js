import express from "express";
import upload from "../config/multer.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  uploadProfilePic,
  deleteProfilePic,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post(
  "/profile-pic",
  authMiddleware,
  upload.single("profilePic"),
  uploadProfilePic,
);

router.delete("/profile-pic", authMiddleware, deleteProfilePic);

export default router;
