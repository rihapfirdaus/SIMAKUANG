import express from "express";
import {
  getDebts,
  getDebtById,
  saveDebt,
  updateDebt,
  deleteDebt,
} from "../controller/SaveController";

const router = express.Router();

router.get("/user/:userId/debts", getDebts);
router.get("/user/:userId/debt/:id", getDebtById);
router.post("/user/:userId/debt", saveDebt);
router.patch("/user/:userId/debt/:id", updateDebt);
router.delete("/user/:userId/debt/:id", deleteDebt);

export default router;
