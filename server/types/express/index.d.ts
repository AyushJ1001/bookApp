import mongoose from "mongoose";
declare namespace Express {
  interface Request {
    user: mongoose.Document;
  }
}
