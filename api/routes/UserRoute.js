const express = require("express");

const userController = require("../controllers/UserController.js");

const router = express.Router();

router.get("/users", userController.getUsers);
router.get("/user/id/:id", userController.getUserById);
router.get("/user/uid/:uid", userController.getUserByUid);
router.get("/user/:email", userController.getUserByEmail);
router.post("/user", userController.saveUser);
router.patch("/user/:id", userController.updateUser);
router.delete("/user/:id", userController.deleteUser);

module.exports = router;
