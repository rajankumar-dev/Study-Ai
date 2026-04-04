import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import notesRoutes from "./routes/notes.routes.js";
import connectDB from "./config/db.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/notes", notesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
