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
