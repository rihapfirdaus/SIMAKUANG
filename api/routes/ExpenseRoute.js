const express = require("express");
const {
  getExpenses,
  getExpenseById,
  getExpensesByMonth,
  getExpensesByYear,
  getExpensesByPeriod,
  saveExpense,
  updateExpense,
  deleteExpense,
} = require("../controllers/ExpenseController.js");
const router = express.Router();

router.get("/user/:userId/expense/:id", getExpenseById);
router.post("/user/:userId/expense", saveExpense);
router.put("/user/:userId/expense/:id", updateExpense);
router.delete("/user/:userId/expense/:id", deleteExpense);

router.get("/user/:userId/expenses", getExpenses);
router.get("/user/:userId/expenses/month/:year/:month", getExpensesByMonth);
router.get("/user/:userId/expenses/year/:year", getExpensesByYear);
router.get(
  "/user/:userId/expenses/period/:startDate/:endDate",
  getExpensesByPeriod
);

module.exports = router;
