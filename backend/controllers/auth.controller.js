import User from "../models/user.model.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";

export async function registerUser(req, res) {
  const { name, email, password } = req.body;

  const isAllreadyRegister = await User.findOne({ email: email });

  if (isAllreadyRegister) {
    res.status(409).json({ message: "email already exist" });
  }
  const hashPassword = crypto.createHash("sha256").digest("hex");

  const user = await User.create({ email, password: hashPassword, name });
  console.log("user created", user);

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRATE,
    {
      expiresIn: "1d",
    },
  );

  res.status(201).json({
    message: "User registered Successfully",
    user: {
      name: user.name,
      email: user.email,
    },
    token,
  });
}

export async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found check credential" });
  }

  const hashPassword = crypto.createHash("sha256").digest("hex");

  if (hashPassword !== user.password) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRATE,
    {
      expiresIn: "1d",
    },
  );

  res.status(200).json({
    message: "User logged in Successfully",
    user: {
      name: user.name,
      email: user.email,
    },
    token,
  });
}
