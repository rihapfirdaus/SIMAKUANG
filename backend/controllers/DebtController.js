import Debt from "../models/DebtModel.js";

export const getDebts = async (req, res) => {
  try {
    const userId = req.params.userId;
    const debts = await Debt.find({ userId });
    res.status(200).json(debts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDebtById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const debt = await Debt.findOne({
      _id: req.params.id,
      userId,
    });
    if (debt) {
      res.status(200).json(debt);
    } else {
      res.status(404).json({ message: "Debt not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const saveDebt = async (req, res) => {
  const { lender, amount, dueDate, status, note } = req.body;
  const userId = req.params.userId;

  try {
    const newDebt = new Debt({
      userId,
      lender,
      amount,
      dueDate,
      status,
      note,
    });

    const savedDebt = await newDebt.save();
    res.status(201).json(savedDebt);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateDebt = async (req, res) => {
  const { lender, amount, dueDate, status, note } = req.body;
  const userId = req.params.userId;

  try {
    const updatedDebt = await Debt.findOneAndUpdate(
      { _id: req.params.id, userId },
      { lender, amount, dueDate, status, note },
      { new: true }
    );

    if (updatedDebt) {
      res.json(updatedDebt);
    } else {
      res.status(404).json({ message: "Debt not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteDebt = async (req, res) => {
  try {
    const userId = req.params.userId;
    const deletedDebt = await Debt.findOneAndDelete({
      _id: req.params.id,
      userId,
    });

    if (deletedDebt) {
      res.json(deletedDebt);
    } else {
      res.status(404).json({ message: "Debt not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
