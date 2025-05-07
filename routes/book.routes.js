import express from "express";
import asyncHandler from "../utils/asyncWrapper.js";

import {
  addBookInDatabase,
  getAllBooks,
  getBookByAuthor,
  getBookByGenre,
  getBookByReleaseYear,
  getBookByTitle,
  updateBook,
  updateBookByTitle,
  deleteBookById,
} from "../controllers/book.controllers.js";

const router = express();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const books = await getAllBooks();
    res.status(200).json({ message: "Got all books", data: books });
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.publishedYear ||
      !req.body.country
    ) {
      res.status(500).json({
        message: "Please add book data to process request.",
        error: "Book not present!",
      });
    }
    const addBook = await addBookInDatabase(req.body);
    res.status(200).json({ message: "Book added successfully", data: addBook });
  })
);

router.get(
  "/:title",
  asyncHandler(async (req, res) => {
    const findBook = await getBookByTitle(req.params.title);
    if (!findBook) {
      res.status(404).json({
        message: "Book with given title not found",
        error: "Book not found",
      });
    }
    res.status(200).json({ message: "Book found", data: findBook });
  })
);

router.get(
  "/author/:author",
  asyncHandler(async (req, res) => {
    const findAuthorBook = await getBookByAuthor(req.params.author);
    if (!findAuthorBook) {
      res.status(404).json({
        message: "Book with given author not found.",
        error: "Book not found!",
      });
    }
    res.status(200).json({ message: "Book found", data: findAuthorBook });
  })
);

router.get(
  "/genre/:genre",
  asyncHandler(async (req, res) => {
    const findGenreBook = await getBookByGenre(req.params.genre);
    if (!findGenreBook) {
      res.status(404).json({
        message: "Book with given genre not found.",
        error: "Book not found!",
      });
    }
    res.status(200).json({ message: "Book found", data: findGenreBook });
  })
);

router.get(
  "/release/:year",
  asyncHandler(async (req, res) => {
    const releaseYear = parseInt(req.params.year);
    const findBookByReleaseYear = await getBookByReleaseYear(releaseYear);
    if (!findBookByReleaseYear) {
      res.status(404).json({
        message: "Book with given release year not found.",
        error: "Book not found!",
      });
    }
    res
      .status(200)
      .json({ message: "Book found", data: findBookByReleaseYear });
  })
);

router.post(
  "/update/id/:id",
  asyncHandler(async (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Please provide update data",
        error: "Update Data not found",
      });
    }
    const updateBookById = await updateBook(req.params.id, req.body);
    if (!updateBookById) {
      return res.status(404).json({
        message: "Book with given id not found.",
        error: "Book does not exist!",
      });
    }
    res
      .status(200)
      .json({ message: "Book found and updated", data: updateBookById });
  })
);

router.post(
  "/update/title/:title",
  asyncHandler(async (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Please provide update data",
        error: "Update Data not found",
      });
    }
    const updateByTitle = await updateBookByTitle(req.params.title, req.body);
    if (!updateByTitle) {
      return res.status(404).json({
        message: "Book with given title not found.",
        error: "Book does not exist!",
      });
    }
    res
      .status(200)
      .json({ message: "Book found and updated", data: updateByTitle });
  })
);

router.delete(
  "/delete/:id",
  asyncHandler(async (req, res) => {
    const deleteById = await deleteBookById(req.params.id);
    if (!deleteById) {
      return res.status(404).json({
        message: "Book with given id not found.",
        error: "Book not found!",
      });
    }
    res.status(200).json({ message: "Book deleted", data: deleteById });
  })
);

export default router;
