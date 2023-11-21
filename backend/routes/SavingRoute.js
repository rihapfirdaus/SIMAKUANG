import express from "express";
import {
  getDebts,
  getDebtById,
  saveDebt,
  updateDebt,
  deleteDebt,
} from "../controller/SaveController";

const router = express.Router();

router.get("/user/:userId/savings", getDebts);
router.get("/user/:userId/saving/:id", getDebtById);
router.post("/user/:userId/saving", saveDebt);
router.patch("/user/:userId/saving/:id", updateDebt);
router.delete("/user/:userId/saving/:id", deleteDebt);

export default router;
