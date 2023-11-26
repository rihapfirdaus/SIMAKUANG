const express = require("express");
const {
  getIncomes,
  getIncomeById,
  getIncomesByMonth,
  getIncomesByYear,
  getIncomesByPeriod,
  saveIncome,
  updateIncome,
  deleteIncome,
} = require("../controllers/IncomeController.js");
const router = express.Router();

router.get("/user/:userId/income/:id", getIncomeById);
router.post("/user/:userId/income", saveIncome);
router.put("/user/:userId/income/:id", updateIncome);
router.delete("/user/:userId/income/:id", deleteIncome);

router.get("/user/:userId/incomes", getIncomes);
router.get("/user/:userId/incomes/month/:year/:month", getIncomesByMonth);
router.get("/user/:userId/incomes/year/:year", getIncomesByYear);
router.get(
  "/user/:userId/incomes/period/:startDate/:endDate",
  getIncomesByPeriod
);

module.exports = router;
