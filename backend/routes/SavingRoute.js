import express from "express";
import {
  getSavings,
  getSavingById,
  saveSaving,
  updateSaving,
  deleteSaving,
} from "../controllers/SavingController.js";

const router = express.Router();

router.get("/user/:userId/savings", getSavings);
router.get("/user/:userId/saving/:id", getSavingById);
router.post("/user/:userId/saving", saveSaving);
router.patch("/user/:userId/saving/:id", updateSaving);
router.delete("/user/:userId/saving/:id", deleteSaving);

export default router;
