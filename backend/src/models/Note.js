import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        // createdAt: {
        //     type: Date,
        //     default: Date.now,
        // },
        // updatedAt: {
        //     type: Date,
        //     default: Date.now,
        // },
    },
    {timestamps: true} // CreatedAt and updatedAt will be automatically managed by Mongoose if this is used
);

const Note = mongoose.model("Note", noteSchema);
export default Note;