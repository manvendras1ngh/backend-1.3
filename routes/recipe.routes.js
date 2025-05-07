import express from "express";
import asyncHandler from "../utils/asyncWrapper.js";
import {
  addRecipeToDatabase,
  getAllRecipe,
  getRecipeByTitle,
  getRecipeByAuthor,
  getRecipeByEasyDifficulty,
  updateRecipeById,
  updateRecipeByTitle,
  deleteRecipeById,
} from "../controllers/recipe.controllers.js";

const router = express.Router();

router.post(
  "/add",
  asyncHandler(async (req, res) => {
    if (!req.body) {
      return res.status(400).json({
        message: "No recipe data provided",
        error: "Missing request body",
      });
    }
    const recipe = await addRecipeToDatabase(req.body);
    res
      .status(201)
      .json({ message: "Recipe added successfully", data: recipe });
  })
);

router.get(
  "/all",
  asyncHandler(async (req, res) => {
    const recipes = await getAllRecipe();
    res
      .status(200)
      .json({ message: "Recipes fetched successfully", data: recipes });
  })
);

router.get(
  "/title/:title",
  asyncHandler(async (req, res) => {
    const recipe = await getRecipeByTitle(req.params.title);
    res
      .status(200)
      .json({ message: "Recipe fetched successfully", data: recipe });
  })
);

router.get(
  "/author/:author",
  asyncHandler(async (req, res) => {
    const recipes = await getRecipeByAuthor(req.params.author);
    res
      .status(200)
      .json({ message: "Recipes fetched successfully", data: recipes });
  })
);

router.get(
  "/difficulty/easy",
  asyncHandler(async (req, res) => {
    const recipes = await getRecipeByEasyDifficulty();
    res
      .status(200)
      .json({ message: "Easy recipes fetched successfully", data: recipes });
  })
);

router.post(
  "/update/id/:id",
  asyncHandler(async (req, res) => {
    if (!req.body) {
      return res.status(400).json({
        message: "No update data provided",
        error: "Missing request body",
      });
    }
    const updatedRecipe = await updateRecipeById(req.params.id, req.body);
    res
      .status(200)
      .json({ message: "Recipe updated successfully", data: updatedRecipe });
  })
);

router.post(
  "/update/title/:title",
  asyncHandler(async (req, res) => {
    if (!req.body) {
      return res.status(400).json({
        message: "No update data provided",
        error: "Missing request body",
      });
    }
    const updatedRecipe = await updateRecipeByTitle(req.params.title, req.body);
    res.status(200).json({
      message: "Recipe updated successfully",
      data: updatedRecipe,
    });
  })
);

router.delete(
  "/delete/:id",
  asyncHandler(async (req, res) => {
    const deletedRecipe = await deleteRecipeById(req.params.id);
    res
      .status(200)
      .json({ message: "Recipe deleted successfully", data: deletedRecipe });
  })
);

export default router;
