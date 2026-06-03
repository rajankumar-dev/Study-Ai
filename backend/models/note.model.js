import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    // File upload fields
    fileUrl: {
      type: String,
      default: null,
    },

    fileType: {
      type: String,
      default: null,
    },

    extractedText: {
      type: String,
      default: "",
    },
    summary: {
      type: String,
      default: "",
    },
    questions: {
      type: String,
      default: "",
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Note", noteSchema);
