import User from "../models/user.model.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";

export async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;

    const isAlreadyRegister = await User.findOne({ email });

    if (isAlreadyRegister) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    const hashPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    // console.log("JWT =", process.env.JWT_SECRATE);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRATE, {
      expiresIn: "1d",
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log("FULL ERROR:", error);

    console.log("MESSAGE:", error.message);

    console.log("STACK:", error.stack);

    res.status(500).json({
      message: error.message,
    });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const hashPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    if (hashPassword !== user.password) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    // console.log("LOGIN JWT =", process.env.JWT_SECRATE);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRATE, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
}
