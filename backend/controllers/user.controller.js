import User from "../models/user.model.js";

export const uploadProfilePic = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const imageUrl = req.file.path;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profilePic: imageUrl },
      { new: true },
    );

    res.json({
      message: "Profile picture updated",
      profilePic: user.profilePic,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
