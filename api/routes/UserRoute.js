const express = require("express");
const {
  getUsers,
  getUserById,
  saveUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  getUserByUid,
} = require("../controllers/UserController.js");

const router = express.Router();

router.get("/users", getUsers);
router.get("/user/id/:id", getUserById);
router.get("/user/uid/:uid", getUserByUid);
router.get("/user/:email", getUserByEmail);
router.post("/user", saveUser);
router.patch("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

module.exports = router;
