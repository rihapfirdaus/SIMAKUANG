import mongoose from "mongoose";
import Users from "./UserModel";

const Debt = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
    ref: Users,
  },
  lender: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["unpaid", "partial", "paid"],
    default: "unpaid",
  },
  note: {
    type: String,
  },
});

export default mongoose.model("Debts", Debt);
