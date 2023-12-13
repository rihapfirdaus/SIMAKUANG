const express = require("express");
const router = express.Router();

const debtController = require("../controllers/DebtController"); // Adjust path as needed

router.post("/debt/", debtController.createDebt);
router.put("/user/:userId/debt/:id", debtController.updateDebt);
router.delete("/user/:userId/debt/:id", debtController.deleteDebt);

router.get("/user/:userId/debt", debtController.getDebtsByUser);
router.get("/user/:userId/debt/id/:id", debtController.getDebtById);
router.get("/user/:userId/debt/total", debtController.getTotalDebtByUser);
router.get(
  "/user/:userId/debt/total/month",
  debtController.getMonthlyDebtsByYear
);
router.get(
  "/user/:userId/debt/total/all/months",
  debtController.getMonthlyDebtsByYear
);
module.exports = router;
