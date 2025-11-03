// routes/forms.js
import express from "express";
import FormEntry from "../models/FormEntry.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// ✅ Create a new form entry (Protected)
router.post("/", auth, async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    const entry = await FormEntry.create({
      user: req.user._id,
      title,
      content,
    });

    res.status(201).json({ message: "Entry created", entry });
  } catch (err) {
    console.error("Error creating entry:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get all entries for logged-in user (Protected)
router.get("/", auth, async (req, res) => {
  try {
    const entries = await FormEntry.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json({ entries });
  } catch (err) {
    console.error("Error fetching entries:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get a single entry by ID (Protected)
router.get("/:id", auth, async (req, res) => {
  try {
    const entry = await FormEntry.findById(req.params.id);
    if (!entry) return res.status(404).json({ message: "Entry not found" });

    if (entry.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json({ entry });
  } catch (err) {
    console.error("Error fetching entry:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Delete a specific entry (Protected)
router.delete("/:id", auth, async (req, res) => {
  try {
    const entry = await FormEntry.findById(req.params.id);
    if (!entry) return res.status(404).json({ message: "Entry not found" });

    if (entry.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    await entry.deleteOne();
    res.json({ message: "Entry deleted successfully" });
  } catch (err) {
    console.error("Error deleting entry:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
