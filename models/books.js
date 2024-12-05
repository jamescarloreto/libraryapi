import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "title required!"]
    },
    author: {
        type: String,
        required: [true, "author required!"]
    },
    description: {
        type: String,
        required: [true, "Description required!"]
    }
});

export const Book = mongoose.model("Book", bookSchema, "books");