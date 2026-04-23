import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import notesRoutes from "./routes/notes.routes.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/notes", notesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/files", uploadRoutes);
app.use("/api/users", userRoutes);

app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
