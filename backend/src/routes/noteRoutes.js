import express from "express";
import { getAllNotes, getNote, createNote, updateNote, deleteAllNotes, deleteNote } from "../controllers/noteController.js";

const router = express.Router();

//Get all notes
router.get("/", getAllNotes);

//Get Specific Note
router.get("/:id", getNote);

//Create Notes
router.post("/", createNote);

//Update note
router.put("/:id", updateNote);

//Delete note
router.delete("/:id", deleteNote);

//Delete All Note
router.delete("/", deleteAllNotes);

export default router;