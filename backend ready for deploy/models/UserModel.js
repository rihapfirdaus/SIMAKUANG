const mongoose = require("mongoose");

const User = mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  displayName: {
    type: String,
    required: true,
    lowercase: true,
  },
  firstName: {
    type: String,
    lowercase: true,
  },
  lastName: {
    type: String,
    lowercase: true,
  },
  photoURL: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  registrationTime: {
    type: Date,
    default: Date.now,
  },
});

User.index({ uid: 1, email: 1 }, { unique: true });

module.exports = mongoose.model("Users", User);
