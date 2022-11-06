import { Request, Response } from "express";
import Book from "../models/book";
import User from "../models/user";
import mongoose from "mongoose";

export const getBooks = async (req: Request, res: Response) => {
  if (!res.locals.user) {
    res.status(400);
    throw new Error("Not logged in");
  }

  const books = await Book.find().where("_id").in(res.locals.user.books).exec();

  res.status(200).json(books);
};

export const newBook = async (req: Request, res: Response) => {
  if (!res.locals.user) {
    res.status(400);
    throw new Error("Not logged in");
  }

  const { name, author } = req.body;

  const check = await Book.findOne({ name });

  try {
    let book: mongoose.Document;
    if (!check) {
      book = await Book.create({ name, author });
      if (res.locals.user.books.includes(book)) {
        res.status(400);
        res.send("Book already in list");
      }
    } else book = check;
    await User.findByIdAndUpdate(res.locals.user._id, {
      $push: { books: book },
    });

    res.status(201).json(book);
  } catch (error: any) {
    res.status(404);
    throw new Error("Invalid input");
  }
};

export const removeBook = async (req: Request, res: Response) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    res.status(400);
    throw new Error("Book not found");
  }

  try {
    const user = await User.findByIdAndUpdate(res.locals.user._id, {
      $pull: { books: book._id },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(401);
    throw new Error("Error");
  }
};

// get book by name
export const getBookByName = async (req: Request, res: Response) => {
  if (!res.locals.user) {
    res.status(400);
    throw new Error("Not logged in");
  }

  const book = await Book.find({ name: req.params.name });

  res.status(200).json(book);
};
