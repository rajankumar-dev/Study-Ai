import Note from "../models/note.model.js";

//Create Note
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const note = await Note.create({
      user: req.user.id,
      title,
      content,
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

    // ✅ total count (yahi add karna hai)
    const total = await Note.countDocuments({ user: req.user.id });

    // ✅ paginated notes
    const notes = await Note.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    // ✅ final response
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

    // ❌ note exist nahi karta
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    // 🔐 security check
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not authorized" });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
