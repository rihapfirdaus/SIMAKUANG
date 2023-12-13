const express = require("express");
const router = express.Router();

const savingController = require("../controllers/SavingController"); // Adjust path as needed

router.post("/saving/", savingController.createSaving);
router.put("/user/:userId/saving/:id", savingController.updateSaving);
router.delete("/user/:userId/saving/:id", savingController.deleteSaving);

router.get("/user/:userId/saving", savingController.getSavingsByUser);
router.get("/user/:userId/saving/id/:id", savingController.getSavingById);
router.get("/user/:userId/saving/total", savingController.getTotalSavingByUser);
router.get(
  "/user/:userId/saving/total/month",
  savingController.getMonthlySavingsByYear
);
router.get(
  "/user/:userId/saving/total/all/months",
  savingController.getMonthlySavingsByYear
);
module.exports = router;
