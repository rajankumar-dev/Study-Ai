import express from "express";
import upload from "../config/multer.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  uploadProfilePic,
  deleteProfilePic,
  getUserProfile,
  updateUserProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post(
  "/profile-pic",
  authMiddleware,
  upload.single("profilePic"),
  uploadProfilePic,
);

// ✅ GET profile
router.get("/me", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

// ✅ UPDATE profile
router.put("/me", authMiddleware, async (req, res) => {
  const { name, email } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { name, email },
    { new: true },
  ).select("-password");

  res.json(updatedUser);
});

router.delete("/profile-pic", authMiddleware, deleteProfilePic);

export default router;
