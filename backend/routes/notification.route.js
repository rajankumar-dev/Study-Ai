import express from "express";
import Notification from "../models/notification.model.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// get notifications
router.get("/", authMiddleware, async (req, res) => {
  const notifications = await Notification.find({ user: req.user.id }).sort({
    createdAt: -1,
  });

  res.json(notifications);
});

// mark as read
router.put("/:id", authMiddleware, async (req, res) => {
  await Notification.findByIdAndUpdate(req.params.id, { read: true });
  res.json({ message: "Marked as read" });
});

export default router;
