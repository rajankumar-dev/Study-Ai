import User from "../models/user.model.js";
import fs from "fs";
import path from "path";

export const uploadProfilePic = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const user = await User.findById(req.user.id);

    // STEP: Delete old image
    if (user.profilePic) {
      const oldPath = path.join(process.cwd(), user.profilePic);

      fs.unlink(oldPath, (err) => {
        if (err) console.log("Old file delete error:", err.message);
      });
    }

    // New image
    const imageUrl = req.file.path;

    user.profilePic = imageUrl;
    await user.save();

    res.json({
      message: "Profile picture updated",
      profilePic: user.profilePic,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProfilePic = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user.profilePic) {
      return res.status(400).json({ message: "No profile pic to delete" });
    }

    // delete from storage
    const filePath = path.join(process.cwd(), user.profilePic);

    fs.unlink(filePath, (err) => {
      if (err) console.log("Delete error:", err.message);
    });

    // remove from DB
    user.profilePic = null;
    await user.save();

    res.json({ message: "Profile picture deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};

export const updateUserProfile = async (req, res) => {
  const { name, email } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { name, email },
    { new: true },
  ).select("-password");

  res.json(user);
};
