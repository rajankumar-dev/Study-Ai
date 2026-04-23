import Note from "../models/note.model.js";

//Create Note
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body || {};

    console.log("BODY:", req.body);

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    let fileUrl = null;
    let fileType = null;

    if (req.file) {
      fileUrl = req.file.path;
      fileType = req.file.mimetype;
    }

    // 🔥 SIMPLE & STABLE LOGIC
    let extractedText = content; // अभी यही use करेंगे
    let summary = ""; // AI बाद में भरेगा

    const note = await Note.create({
      user: req.user.id,
      title,
      content,
      fileUrl,
      fileType,
      extractedText,
      summary, // 🔥 new field
    });

    res.status(201).json({
      message: "Note created successfully",
      note,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get all Notes
export const getNotes = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const total = await Note.countDocuments({ user: req.user.id });

    const notes = await Note.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      notes,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Delete Note
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await note.deleteOne();

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update Note
export const updateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not authorized" });
    }

    note.title = req.body.title || note.title;
    note.content = req.body.content || note.content;

    if (req.file) {
      note.fileUrl = req.file.path;
      note.fileType = req.file.mimetype;
    }

    const updatedNote = await note.save();

    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get Note by ID
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not authorized" });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
