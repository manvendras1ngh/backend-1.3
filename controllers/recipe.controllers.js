import { Recipe } from "../models/recipe.models.js";

export const addRecipeToDatabase = async (newRecipe) => {
  try {
    if (!newRecipe) {
      throw new Error("Please provide recipe to add!");
    }
    const addRecipe = new Recipe(newRecipe);
    await addRecipe.save();

    return addRecipe;
  } catch (error) {
    throw error;
  }
};

export const getAllRecipe = async () => {
  try {
    const allRecipie = await Recipe.find();
    return allRecipie;
  } catch (error) {
    throw error;
  }
};

export const getRecipeByTitle = async (recipeTitle) => {
  try {
    if (!recipeTitle) {
      throw new Error("Recipe title not provied.");
    }
    const recipe = await Recipe.findOne({ title: recipeTitle });
    if (!recipe) {
      throw new Error("No Recipe found for given title");
    }
    return recipe;
  } catch (error) {
    throw error;
  }
};

export const getRecipeByAuthor = async (recipeAuthor) => {
  try {
    if (!recipeAuthor) {
      throw new Error("Recipe author not provied.");
    }
    const recipe = await Recipe.findOne({ author: recipeAuthor });
    if (!recipe) {
      throw new Error("No Recipe found for given author");
    }
    return recipe;
  } catch (error) {
    throw error;
  }
};

export const getRecipeByEasyDifficulty = async () => {
  try {
    const recipe = await Recipe.findOne({ difficulty: "Easy" });
    return recipe;
  } catch (error) {
    throw error;
  }
};

export const updateRecipeById = async (recipeId, updateData) => {
  try {
    if (!recipeId || !updateData) {
      throw new Error("Please provide id or udpate data!");
    }
    const updateRecipe = await Recipe.findByIdAndUpdate(recipeId, updateData, {
      new: true,
    });

    if (!updateRecipe) {
      throw new Error("Recipe not found");
    }
    return updateRecipe;
  } catch (error) {
    throw error;
  }
};

export const updateRecipeByTitle = async (recipeTitle, updateData) => {
  try {
    if (!recipeTitle || !updateData) {
      throw new Error("Please provide id or udpate data!");
    }
    const updateRecipe = await Recipe.findOneAndUpdate(
      { title: recipeTitle },
      updateData,
      {
        new: true,
      }
    );

    if (!updateRecipe) {
      throw new Error("Recipe not found");
    }
    return updateRecipe;
  } catch (error) {
    throw error;
  }
};

export const deleteRecipeById = async (recipeId) => {
  try {
    if (!recipeId) {
      throw new Error("Please provide recipe id!");
    }
    const deleteRecipe = await Recipe.findByIdAndDelete(recipeId);
    if (!deleteRecipe) {
      throw new Error("Recipe not found");
    }
    return deleteRecipe;
  } catch (error) {
    throw error;
  }
};
