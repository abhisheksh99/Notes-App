import asyncHandler from "express-async-handler";
import Note from "../models/noteModel.js";

// Add a new note
export const addNote = asyncHandler(async (req, res) => {
    const { title, content, tags } = req.body;
    const { id } = req.user;

    if (!title || !content) {
        res.status(400).json({
            success: false,
            message: "Title and content are required"
        });
        return;
    }

    const note = await Note.create({
        userId: id,
        title,
        content,
        tags: tags || []
    });

    res.status(201).json({
        success: true,
        message: "Note created successfully",
        note
    });
});

// Edit an existing note
export const editNote = asyncHandler(async (req, res) => {
    const { noteId } = req.params;
    const { title, content, tags, isPinned } = req.body;

    console.log(`Attempting to find note with ID: ${noteId}`);

    const note = await Note.findById(noteId);

    if (!note) {
        return res.status(404).json({
            success: false,
            message: "Note not found"
        });
    }

    if (req.user.id !== note.userId.toString()) {
        return res.status(401).json({
            success: false,
            message: "You can only update your own note!"
        });
    }

    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (isPinned !== undefined) note.isPinned = isPinned;

    await note.save();

    res.status(200).json({
        success: true,
        message: "Note updated successfully",
        note
    });
});

// Delete a note
export const deleteNote = asyncHandler(async (req, res) => {
    const { noteId } = req.params;

    const note = await Note.findOneAndDelete({ _id: noteId, userId: req.user.id });

    if (!note) {
        return res.status(404).json({
            success: false,
            message: "Note not found or you're not authorized to delete it"
        });
    }

    res.status(200).json({
        success: true,
        message: "Note deleted successfully",
        deletedNote: note
    });
});

// Get all notes
export const getAllNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find({ userId: req.user.id }).sort({ isPinned: -1, updatedAt: -1 });

    if (!notes.length) {
        return res.status(404).json({
            success: false,
            message: "No notes found for this user"
        });
    }

    res.status(200).json({
        success: true,
        message: "Notes retrieved successfully",
        notes
    });
});

// Update note pinned status
export const updateNotePinned = asyncHandler(async (req, res) => {
    const { noteId } = req.params;
    const { isPinned } = req.body;

    if (isPinned === undefined) {
        return res.status(400).json({
            success: false,
            message: "isPinned value is required"
        });
    }

    const note = await Note.findOneAndUpdate(
        { _id: noteId, userId: req.user.id },
        { isPinned },
        { new: true }
    );

    if (!note) {
        return res.status(404).json({
            success: false,
            message: "Note not found or you're not authorized to update it"
        });
    }

    res.status(200).json({
        success: true,
        message: "Note pin status updated successfully",
        note
    });
});

// Search notes
export const searchNote = asyncHandler(async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({
            success: false,
            message: "Search query is required"
        });
    }

    const matchingNotes = await Note.find({
        userId: req.user.id,
        $or: [
            { title: { $regex: new RegExp(query, "i") } },
            { content: { $regex: new RegExp(query, "i") } },
        ],
    });

    res.status(200).json({
        success: true,
        message: "Notes matching the search query retrieved successfully",
        notes: matchingNotes
    });
});
