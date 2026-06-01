import express from "express";
import upload from "../config/multer.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import User from "../models/user.model.js";

import {
  uploadProfilePic,
  deleteProfilePic,
  getUserProfile,
  updateUserProfile,
  updateSettings,
} from "../controllers/user.controller.js";

const router = express.Router();

/* =========================
   PROFILE PICTURE
========================= */

// Upload Profile Picture
router.post(
  "/profile-pic",
  authMiddleware,
  upload.single("profilePic"),
  uploadProfilePic,
);

// Delete Profile Picture
router.delete("/profile-pic", authMiddleware, deleteProfilePic);

/* =========================
   USER PROFILE
========================= */

// Get Logged In User Profile
router.get("/me", authMiddleware, getUserProfile);

// Update Profile
router.put("/me", authMiddleware, updateUserProfile);

/* =========================
   SETTINGS
========================= */

// Update Settings
router.put("/settings", authMiddleware, updateSettings);

export default router;
