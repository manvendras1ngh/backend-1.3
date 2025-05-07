import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    difficulty: { type: String, enums: ["Easy", "Intermediate", "Difficult"] },
    prepTime: {
      type: Number,
      required: true,
    },
    cookTime: {
      type: Number,
      required: true,
    },
    ingredients: [{ type: String, required: true }],
    instructions: [{ type: String, required: true }],
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Recipe = mongoose.model("Recipe", recipeSchema);
