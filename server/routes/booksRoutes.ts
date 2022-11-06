import express from "express";
import asyncHandler from "express-async-handler";
import {
  getBookByName,
  getBooks,
  newBook,
  removeBook,
} from "../controllers/booksController";
import protect from "../middleware/authMiddleware";
const router = express.Router();

router.get("/", protect, asyncHandler(getBooks));

router.get("/name/:name", protect, asyncHandler(getBookByName));

router.post("/new", protect, asyncHandler(newBook));

router.delete("/:id", protect, asyncHandler(removeBook));

export default router;
