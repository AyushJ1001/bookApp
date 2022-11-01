import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const allUsers = async (req: Request, res: Response) => {
  try {
    const result = await User.find();
    res
      .status(200)
      .json(result.map((obj) => ({ name: obj.name, email: obj.email })));
  } catch (error: any) {
    res.status(400);
    throw new Error("Error" + error.message);
  }
};

export const registerUser = async (req: Request, res: Response) => {
  const userData = req.body;
  const salt = await bcrypt.genSalt(10);

  const user = await User.findOne({ email: userData.email });

  if (user) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(userData.password, salt);
  try {
    const user = await User.create({ ...userData, password: hashedPassword });
    res.status(201).send({
      id: user._id,
      name: user.name,
      email: user.email,
      books: user.books,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid Data");
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User not found!");
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  res.status(200).json({
    id: user._id,
    name: user.name,
    email: user.email,
    books: user.books,
    token: generateToken(user._id),
  });
};

// Generate JWT Token
const generateToken = (id: mongoose.Types.ObjectId) =>
  jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });

