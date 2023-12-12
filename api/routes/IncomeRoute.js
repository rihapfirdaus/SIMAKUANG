const express = require("express");
const router = express.Router();

const IncomeController = require("./controllers/IncomeController");

router.post("/incomes", IncomeController.createIncome); // Create income
router.get("/incomes/:userId", IncomeController.getIncomesByUser); // Get income by user
router.get("/incomes/:id", IncomeController.getIncomeById); // Get income by ID
router.put("/incomes/:id", IncomeController.updateIncome); // Update income
router.delete("/incomes/:id", IncomeController.deleteIncome); // Delete income
router.get(
  "/incomes/total/month/:year",
  IncomeController.getTotalIncomeByMonth
); // Get total income per month (by year)
router.get("/incomes/total/year/:year", IncomeController.getTotalIncomeByYear); // Get total income per year
router.get(
  "/incomes/total/period/:period",
  IncomeController.getTotalIncomeByPeriod
); // Get total income per period (custom or predefined)
router.get("/incomes/monthly/:year/:month", IncomeController.getMonthlyIncome); // Get monthly income (detailed data)
router.get("/incomes/weekly/:year/:week", IncomeController.getWeeklyIncome); // Get weekly income (detailed data)
router.get("/incomes/yearly/:year", IncomeController.getYearlyIncome); // Get yearly income (detailed data)

module.exports = router;
