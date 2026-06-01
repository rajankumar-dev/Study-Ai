import User from "../models/user.model.js";
import fs from "fs";
import path from "path";

// UPLOAD PROFILE PIC
export const uploadProfilePic = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const user = await User.findById(req.user.id);

    // DELETE OLD IMAGE
    if (user.profilePic) {
      const oldPath = path.join(process.cwd(), user.profilePic);

      fs.unlink(oldPath, (err) => {
        if (err) {
          console.log("Old file delete error:", err.message);
        }
      });
    }

    // SAVE NEW IMAGE
    user.profilePic = req.file.path;

    await user.save();

    res.status(200).json({
      message: "Profile picture updated successfully",
      profilePic: user.profilePic,
      user,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// DELETE PROFILE PIC
export const deleteProfilePic = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user.profilePic) {
      return res.status(400).json({
        message: "No profile picture found",
      });
    }

    // DELETE FILE FROM STORAGE
    const filePath = path.join(process.cwd(), user.profilePic);

    fs.unlink(filePath, (err) => {
      if (err) {
        console.log("Delete error:", err.message);
      }
    });

    // REMOVE FROM DB
    user.profilePic = null;

    await user.save();

    res.status(200).json({
      message: "Profile picture deleted successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// GET USER PROFILE
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// UPDATE USER PROFILE
export const updateUserProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // UPDATE NAME
    if (name !== undefined) {
      user.name = name;
    }

    // UPDATE EMAIL
    if (email !== undefined) {
      user.email = email;
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
        darkMode: user.darkMode,
        notifications: user.notifications,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// UPDATE SETTINGS
export const updateSettings = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const { name, email, darkMode, notifications } = req.body;

    // UPDATE NAME
    if (name !== undefined) {
      user.name = name;
    }

    // UPDATE EMAIL
    if (email !== undefined) {
      user.email = email;
    }

    // UPDATE DARK MODE
    if (darkMode !== undefined) {
      user.darkMode = darkMode;
    }

    // UPDATE NOTIFICATIONS
    if (notifications !== undefined) {
      user.notifications = notifications;
    }

    await user.save();

    res.status(200).json({
      message: "Settings updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
        darkMode: user.darkMode,
        notifications: user.notifications,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
