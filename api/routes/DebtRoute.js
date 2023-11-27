const express = require("express");
const {
  getDebts,
  getDebtById,
  saveDebt,
  updateDebt,
  deleteDebt,
} = require("../controllers/DebtController.js");

const router = express.Router();

router.get("/user/:userId/debts", getDebts);
router.get("/user/:userId/debt/:id", getDebtById);
router.post("/user/:userId/debt", saveDebt);
router.patch("/user/:userId/debt/:id", updateDebt);
router.delete("/user/:userId/debt/:id", deleteDebt);

module.exports = router;
