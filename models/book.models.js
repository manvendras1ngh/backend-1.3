import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishedYear: {
      type: Number,
      required: true,
    },
    genre: [{ type: String, required: true }],
    language: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
    },
    summary: {
      type: String,
    },
    coverImageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Book = mongoose.model("Book", bookSchema);
