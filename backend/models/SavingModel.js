import mongoose from "mongoose";
import Users from "./UserModel.js";

const Saving = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
    ref: Users,
  },
  amount: {
    type: Number,
    required: true,
  },
  currentBalance: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  note: {
    type: String,
  },
});

export default mongoose.model("Savings", Saving);
