import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    books: {
      type: [mongoose.Types.ObjectId],
      default: [] as any as mongoose.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
