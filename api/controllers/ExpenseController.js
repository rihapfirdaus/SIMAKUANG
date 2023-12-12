const Expense = require("../models/Expense"); // Adjust path as needed

// Create a new expense
const createExpense = async (req, res) => {
  const { userId, amount, category, date, note } = req.body;

  try {
    const expense = new Expense({ userId, amount, category, date, note });
    await expense.save();

    return res
      .status(201)
      .json({ message: "Expense created successfully", expense });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating expense." });
  }
};

// Get all expenses for a user
const getExpensesByUser = async (req, res) => {
  const userId = req.params.userId;
  const { year, month, startDate, endDate } = req.query;

  try {
    let match = { userId };

    if (year) {
      match.date = {
        $gte: new Date(year, 0, 1),
        $lt: new Date(year + 1, 0, 1),
      };
    } else if (month) {
      match.date = {
        $gte: new Date(new Date().getFullYear(), month - 1, 1), // adjust month index (0-based)
        $lt: new Date(new Date().getFullYear(), month, 1),
      };
    } else if (startDate && endDate) {
      match.date = { $gte: new Date(startDate), $lt: new Date(endDate) };
    }

    const expenses = await Expense.find(match);

    if (!expenses) {
      return res.status(404).json({ message: "No expenses found for user." });
    }

    return res.status(200).json({ expenses });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching expenses." });
  }
};

// Update an expense
const updateExpense = async (req, res) => {
  const expenseId = req.params.id;
  const { amount, category, date, note } = req.body;

  try {
    const expense = await Expense.findByIdAndUpdate(expenseId, {
      amount,
      category,
      date,
      note,
    });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found." });
    }

    return res
      .status(200)
      .json({ message: "Expense updated successfully", expense });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating expense." });
  }
};

// Delete an expense
const deleteExpense = async (req, res) => {
  const expenseId = req.params.id;

  try {
    await Expense.findByIdAndDelete(expenseId);

    return res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting expense." });
  }
};

// Get a specific expense by id
const getExpenseById = async (req, res) => {
  const expenseId = req.params.id;

  try {
    const expense = await Expense.findById(expenseId);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found." });
    }

    return res.status(200).json({ expense });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching expense." });
  }
};

// Get total expense for a user by month (aggregations)
const getTotalExpenseByMonth = async (req, res) => {
  const userId = req.params.userId;
  const year = req.query.year || new Date().getFullYear();
  const month = req.query.month || new Date().getMonth();

  try {
    const match = {
      userId,
      date: {
        $gte: new Date(year, month, 1),
        $lt: new Date(year, month + 1, 1),
      },
    };
    const totalExpense = await Expense.aggregate([
      { $match: match },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const expense = totalExpense[0] ? totalExpense[0].total : 0;

    return res.status(200).json({ expense });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error fetching expense by month." });
  }
};

// Get total expense for a user by year (aggregations)
const getTotalExpenseByYear = async (req, res) => {
  const userId = req.params.userId;
  const year = req.query.year || new Date().getFullYear();

  try {
    const match = {
      userId,
      date: { $gte: new Date(year, 0, 1), $lt: new Date(year + 1, 0, 1) },
    };
    const totalExpense = await Expense.aggregate([
      { $match: match },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const expense = totalExpense[0] ? totalExpense[0].total : 0;

    return res.status(200).json({ expense });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching expense by year." });
  }
};

// Get total expense for a user by period (aggregations)
const getTotalExpenseByPeriod = async (req, res) => {
  const userId = req.params.userId;
  const startDate = req.query.startDate; // YYYY-MM-DD format
  const endDate = req.query.endDate; // YYYY-MM-DD format

  if (!startDate || !endDate) {
    return res
      .status(400)
      .json({ message: "Missing start and end date for period." });
  }

  try {
    const match = {
      userId,
      date: { $gte: new Date(startDate), $lt: new Date(endDate) },
    };
    const totalExpense = await Expense.aggregate([
      { $match: match },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const expense = totalExpense[0] ? totalExpense[0].total : 0;

    return res.status(200).json({ expense });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error fetching expense by period." });
  }
};

// Get array total by month
async function getMonthlyExpense(req, res) {
  const startDate = new Date(req.query.year, req.query.month, 1);
  const endDate = new Date(req.query.year, req.query.month + 1, 0);

  const expenses = await getAllExpenses(req, {
    period: "monthly",
    startDate,
    endDate,
  });

  const monthlyExpenses = expenses.reduce((acc, expense) => {
    acc[expense.date.getMonth()] += expense.amount;
    return acc;
  }, {});

  return res.status(200).json({ monthlyExpenses });
}

// Get array total by week
async function getWeeklyExpense(req, res) {
  const startDate = new Date(req.query.year, req.query.month, req.query.day);
  const endDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate() + 6
  );

  const expenses = await getAllExpenses(req, {
    period: "custom",
    startDate,
    endDate,
  });

  const weeklyExpenses = expenses.reduce((acc, expense) => {
    acc[expense.date.getWeek()] += expense.amount;
    return acc;
  }, {});

  return res.status(200).json({ weeklyExpenses });
}

// Get array total by year
async function getYearlyExpense(req, res) {
  const year = req.query.year;

  const expenses = await getAllExpenses(req, { period: "yearly", year });

  const yearlyExpenses = expenses.reduce((acc, expense) => {
    acc[expense.date.getFullYear()] += expense.amount;
    return acc;
  }, {});

  return res.status(200).json({ yearlyExpenses });
}

module.exports = {
  createExpense,
  getExpensesByUser,
  updateExpense,
  deleteExpense,
  getExpenseById,
  getTotalExpenseByMonth,
  getTotalExpenseByYear,
  getTotalExpenseByPeriod,
  getMonthlyExpense,
  getWeeklyExpense,
  getYearlyExpense,
};
