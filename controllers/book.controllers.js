import { Book } from "../models/book.models.js";

export const addManyBooks = async (data) => {
  try {
    for (const book of data) {
      const newBook = new Book({
        title: book.title,
        author: book.author,
        publishedYear: book.publishedYear,
        genre: book.genre,
        language: book.language,
        country: book.country,
        rating: book.rating,
        summary: book.summary,
        coverImageUrl: book.coverImageUrl,
      });
      await newBook.save();
    }
    console.log("all books saved successfully");
    return;
  } catch (error) {
    throw error;
  }
};

export const addBookInDatabase = async (bookData) => {
  try {
    const newBook = new Book(bookData);
    await newBook.save();
    return newBook;
  } catch (error) {
    throw new Error("Error saving to database!");
  }
};

export const getAllBooks = async () => {
  try {
    const getBooks = await Book.find();
    return getBooks;
  } catch (error) {
    throw new Error("Error while getting books from database!");
  }
};

export const getBookByTitle = async (bookTitle) => {
  try {
    if (bookTitle) {
      const getBook = await Book.findOne({ title: bookTitle });
      return getBook;
    } else {
      return "Please enter a book title!";
    }
  } catch (error) {
    throw new Error("Book not found!");
  }
};

export const getBookByAuthor = async (authorName) => {
  try {
    if (authorName) {
      const getBook = await Book.findOne({ author: authorName });
      return getBook;
    } else {
      return "Please enter author name!";
    }
  } catch (error) {
    throw new Error("Book not found!");
  }
};

export const getBookByGenre = async (bookGenre) => {
  try {
    if (bookGenre) {
      const getBook = await Book.find({ genre: bookGenre });
      return getBook;
    } else {
      return "Please enter a book genre!";
    }
  } catch (error) {
    throw new Error("Book not found!");
  }
};

export const getBookByReleaseYear = async (releaseYear) => {
  try {
    if (releaseYear) {
      const getBook = await Book.findOne({ publishedYear: releaseYear });
      return getBook;
    } else {
      return "Please enter book's publish year!";
    }
  } catch (error) {
    throw new Error("Book not found!");
  }
};

export const updateBook = async (bookId, updateData) => {
  try {
    if (bookId && updateData) {
      const updatedBook = await Book.findByIdAndUpdate(bookId, updateData, {
        new: true,
      });
      return updatedBook;
    } else {
      return "Please enter book id and update data!";
    }
  } catch (error) {
    throw new Error("Book update failed!");
  }
};

export const updateBookByTitle = async (bookTitle, updateData) => {
  try {
    if (bookTitle && updateData) {
      const updatedBook = await Book.findOneAndUpdate(
        { title: bookTitle },
        updateData,
        { new: true }
      );
      return updatedBook;
    } else {
      return "Please enter book title and update data!";
    }
  } catch (error) {
    throw new Error("Book update failed!");
  }
};

export const deleteBookById = async (bookId) => {
  try {
    if (bookId) {
      const deleteBook = await Book.findByIdAndDelete(bookId);
      return deleteBook;
    } else {
      return "Please enter book id to delete data!";
    }
  } catch (error) {
    throw new Error("Book delete failed!");
  }
};
