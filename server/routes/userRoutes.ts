import express from "express";
import asyncHandler from "express-async-handler";
import {
  registerUser,
  loginUser,
  allUsers,
  getUser,
} from "../controllers/userController";
const router = express.Router();

router.get("/", asyncHandler(allUsers));

router.get("/get", asyncHandler(getUser));

router.post("/register", asyncHandler(registerUser));

router.post("/login", asyncHandler(loginUser));

export default router;
