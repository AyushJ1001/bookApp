import express, { urlencoded } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import errorHandler from "./middleware/errorMiddleware";

dotenv.config();

const app = express();
const port = process.env.PORT;

try {
  mongoose.connect("mongodb://localhost:27017/reactApp");
  console.log("Successfully connected to database");
} catch (error) {
  console.log("Oops! An Error!");
}

app.use(express.json());
app.use(urlencoded({ extended: true }));

import bookRouter from "./routes/booksRoutes";
import userRouter from "./routes/userRoutes";
app.use("/books", bookRouter);
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server Running");
});
app.use(errorHandler);

app.listen(port || 5000, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
