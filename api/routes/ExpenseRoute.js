const express = require("express");
const router = express.Router();

const ExpenseController = require("./controllers/ExpenseController");

router.post("/expense", ExpenseController.createExpense); // Create income
router.get("/expense/:userId", ExpenseController.getExpensesByUser); // Get income by user
router.get("/expense/:id", ExpenseController.getExpenseById); // Get income by ID
router.put("/expense/:id", ExpenseController.updateExpense); // Update income
router.delete("/expense/:id", ExpenseController.deleteExpense); // Delete income
router.get(
  "/expense/total/month/:year",
  ExpenseController.getTotalExpenseByMonth
); // Get total income per month (by year)
router.get(
  "/expense/total/year/:year",
  ExpenseController.getTotalExpenseByYear
); // Get total income per year
router.get(
  "/expense/total/period/:period",
  ExpenseController.getTotalExpenseByPeriod
); // Get total income per period (custom or predefined)
router.get(
  "/expense/monthly/:year/:month",
  ExpenseController.getMonthlyExpense
); // Get monthly income (detailed data)
router.get("/expense/weekly/:year/:week", ExpenseController.getWeeklyExpense); // Get weekly income (detailed data)
router.get("/expense/yearly/:year", ExpenseController.getYearlyExpense); // Get yearly income (detailed data)

module.exports = router;
