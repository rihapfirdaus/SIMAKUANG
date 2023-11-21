import express from "express";
import {
  getExpenses,
  getExpenseById,
  getExpensesByMonth,
  getExpensesByYear,
  getExpensesByPeriod,
  saveExpense,
  updateExpense,
  deleteExpense,
} from "../controllers/ExpenseController.js";
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

export default router;
