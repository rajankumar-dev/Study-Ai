import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protect = async (req, res, next) => {
  try {
    let token;

    // ✅ Check Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Extract token
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRATE);

      // Get user from DB (without password)
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }

      // Attach user to request
      req.user = user;

      next();
    } else {
      return res.status(401).json({ error: "No token provided" });
    }
  } catch (error) {
    return res.status(401).json({
      error: "Not authorized, token failed",
    });
  }
};

export default protect;
