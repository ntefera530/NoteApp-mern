import Note from "../models/Note.js";

export const getAllNotes = async (req, res) => {
    try{
        const notes = await Note.find().sort({createdAt : -1});// Sort notes by createdAt in reverse (newest -> oldest) order 
        if(!notes || notes.length === 0){
            return res.status(404).json({ message: "No notes found" });
        }
        
        res.status(200).json(notes);
    }
    catch (error){
        console.error("Error fetching notes:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getNote = async (req, res) => {
    try{
        const { id } = req.params;
        const note = await Note.findById(id);
        if(!note){
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(201).json(note);
    }
    catch (error){
        console.error("Error Finding note:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const createNote = async (req, res) => {
    try{
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }

        const newNote = new Note({ title, content });
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    }
    catch (error){
        console.error("Error creating note:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateNote = async (req, res) => {
    try{
        const { id } = req.params;
        const { title, content } = req.body;
        const noteToUpdate = await Note.findByIdAndUpdate(id, { title, content }, { new: true });

        if(!noteToUpdate){
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(noteToUpdate);
    }
    catch (error){
        console.error("Error updating note:", error);
        res.status(500).json({ message: "Internal server error" });
    }
    
}

export const deleteNote = async (req, res) => {
    try{
        const { id } = req.params;
        const noteToDelete = await Note.findByIdAndDelete(id);

        if(!noteToDelete){
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({ message: "Note deleted" });
    }
    catch (error){
        console.error("Error deleting note:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteAllNotes = async (req, res) => { 
    try{
        await Note.deleteMany();
        res.status(200).json({ message: "All notes deleted" });
    }
    catch (error){
        console.error("Error deleting all notes:", error);
        res.status(500).json({ message: "Internal server error" });
    }
    
}