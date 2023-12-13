const mongoose = require("mongoose");
const Users = require("./UserModel.js");

const Saving = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ["increase", "decrease"],
    default: "increase",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  note: {
    type: String,
  },
});

module.exports = mongoose.model("Savings", Saving);
