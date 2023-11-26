const express = require("express");
const {
  getUsers,
  getUserById,
  saveUser,
  updateUser,
  deleteUser,
  getUserByEmail,
} = require("../controllers/UserController.js");

const router = express.Router();

router.get("/users", getUsers);
router.get("/user/:id", getUserById);
router.get("/user/:email", getUserByEmail);
router.post("/user", saveUser);
router.patch("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

module.exports = router;
