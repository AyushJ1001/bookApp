import express from "express";
import asyncHandler from "express-async-handler";
import { getBooks, newBook, removeBook } from "../controllers/booksController";
import protect from "../middleware/authMiddleware";
const router = express.Router();

router.get("/", protect, asyncHandler(getBooks));

router.post("/new", protect, asyncHandler(newBook));

router.delete("/:id", protect, asyncHandler(removeBook));

export default router;
