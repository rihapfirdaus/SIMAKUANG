const express = require("express");
const router = express.Router();

const expenseController = require("../controllers/ExpenseController"); // Adjust path as needed

router.post("/user/:userId/expense/", expenseController.createExpense);
router.put("/user/:userId/expense/:id", expenseController.updateExpense);
router.delete("/user/:userId/expense/:id", expenseController.deleteExpense);

router.get("/user/:userId/expense", expenseController.getExpensesByUser);
router.get("/user/:userId/expense/id/:id", expenseController.getExpenseById);
router.get(
  "/user/:userId/expense/total",
  expenseController.getTotalExpenseByUser
);
router.get(
  "/user/:userId/expense/total/all/months",
  expenseController.getMonthlyExpensesByYear
);
router.get(
  "/user/:userId/expense/category",
  expenseController.getExpenseByCategory
);
module.exports = router;
