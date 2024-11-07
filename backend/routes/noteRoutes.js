import express from "express";
import { verifyToken } from "../utils/verifyUser.js"; 
import { addNote, deleteNote, editNote, getAllNotes, searchNote, updateNotePinned } from "../controllers/noteController.js";


const router = express.Router(); 

// Route to add a new note
router.route("/add")
  .post(verifyToken, addNote); 

// Route to edit an existing note by noteId
router.route("/edit/:noteId")
  .put(verifyToken, editNote); 

// Route to get all notes for the authenticated user
router.route("/all")
  .get(verifyToken, getAllNotes); 

// Route to delete a note by noteId
router.route("/delete/:noteId")
  .delete(verifyToken, deleteNote); 

// Route to update the pinned status of a note by noteId
router.route("/update-note-pinned/:noteId")
  .put(verifyToken, updateNotePinned); 

// Route to search for notes
router.route("/search")
  .get(verifyToken, searchNote); 

export default router; 