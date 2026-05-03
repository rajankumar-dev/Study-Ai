import Notification from "../models/notification.model.js";

export const createNotification = async (userId, message) => {
  try {
    await Notification.create({
      user: userId,
      message,
    });
  } catch (err) {
    console.log("Notification error:", err.message);
  }
};
