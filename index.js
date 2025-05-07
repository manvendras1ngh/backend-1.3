import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import { initializeDatabase } from "./db/db.connect.js";

import recipeRoutes from "./routes/recipe.routes.js";
import bookRoutes from "./routes/book.routes.js";
import hotelRouter from "./routes/hotel.routes.js";

import { addManyBooks } from "./controllers/book.controllers.js";

const app = express();
dotenv.config({ path: "./.env" });
const PORT = process.env.PORT;

initializeDatabase();

app.use(express.json());
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

app.use("/api/recipe", recipeRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/hotels", hotelRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is hot and ready to serve!" });
});

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  res
    .status(statusCode)
    .json({ message: "Internal server error!", error: error.message });
});

app.listen(PORT, () => {
  console.log("Server is hot!");
});
