import Expense from "../models/ExpenseModel.js";

export const getExpenses = async (req, res) => {
  try {
    const userId = req.params.userId;
    const expenses = await Expense.find({ userId });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getExpenseById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const expense = await Expense.findOne({
      _id: req.params.id,
      userId,
    });
    if (expense) {
      res.json(expense);
    } else {
      res.status(404).json({ message: "Expense not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getExpensesByMonth = async (req, res) => {
  const { userId, year, month } = req.params;

  try {
    const parsedMonth = parseInt(month);
    const nextMonth = parsedMonth < 12 ? parsedMonth + 1 : 1;
    const nextYear = parsedMonth < 12 ? year : parseInt(year) + 1;

    const expense = await Expense.find({
      userId,
      date: {
        $gte: new Date(`${year}-${month}-01`),
        $lt: new Date(`${nextYear}-${nextMonth}-01`),
      },
    });

    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getExpensesByYear = async (req, res) => {
  const { userId, year } = req.params;

  try {
    const expense = await Expense.find({
      userId,
      date: {
        $gte: new Date(`${year}-01-01`),
        $lt: new Date(`${parseInt(year) + 1}-01-01`),
      },
    });

    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getExpensesByPeriod = async (req, res) => {
  const { userId, startDate, endDate } = req.params;

  try {
    const expense = await Expense.find({
      userId,
      date: {
        $gte: new Date(startDate),
        $lt: new Date(`${parseInt(endDate) + 1}`),
      },
    });

    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const saveExpense = async (req, res) => {
  const { amount, category, date, note } = req.body;
  const userId = req.params.userId;

  try {
    const newExpense = new Expense({
      userId,
      amount,
      category,
      date,
      note,
    });

    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateExpense = async (req, res) => {
  const { amount, category, date, note } = req.body;
  const userId = req.params.userId;

  try {
    const updatedExpense = await Expense.findOneAndUpdate(
      { _id: req.params.id, userId },
      { amount, category, date, note },
      { new: true }
    );

    if (updatedExpense) {
      res.json(updatedExpense);
    } else {
      res.status(404).json({ message: "Expense not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const userId = req.params.userId;
    const deletedExpense = await Expense.findOneAndDelete({
      _id: req.params.id,
      userId,
    });

    if (deletedExpense) {
      res.json(deletedExpense);
    } else {
      res.status(404).json({ message: "Expense not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
