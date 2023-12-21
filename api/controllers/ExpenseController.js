const Expense = require("../models/ExpenseModel.js");

// Create a new expense
const createExpense = async (req, res) => {
  const userId = req.params.userId;
  const { amount, category, date, note } = req.body;

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

// Get all expenses for a user (optional filtering)
const getExpensesByUser = async (req, res) => {
  const userId = req.params.userId;
  const { year, month, startDate, endDate } = req.query;

  try {
    let match = { userId }; // Default match only filters by user

    if (year && month) {
      match.date = {
        $gte: new Date(year, month - 1, 1), // Adjust month index (0-based)
        $lt: new Date(year, month, 1),
      };
    } else if (year) {
      match.date = {
        $gte: new Date(year, 0, 1),
        $lt: new Date(`${parseInt(year) + 1}-01-01`),
      };
    } else if (month) {
      match.date = {
        $gte: new Date(new Date().getFullYear(), month - 1, 1), // Adjust month index (0-based)
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
  const userId = req.params.userId;
  const { amount, category, date, note } = req.body;

  try {
    const expense = await Expense.findByIdAndUpdate(
      expenseId,
      { amount, category, date, note },
      { userId }
    );

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
  const userId = req.params.userId;

  try {
    const expense = await Expense.findByIdAndDelete(expenseId, { userId });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found." });
    }

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

// Get total expense
const getTotalExpenseByUser = async (req, res) => {
  const userId = req.params.userId;
  const { year, month, startDate, endDate } = req.query;

  try {
    let match = { userId }; // Default match only filters by user

    if (year && month) {
      match.date = {
        $gte: new Date(year, month - 1, 1), // Adjust month index (0-based)
        $lt: new Date(year, month, 1),
      };
    } else if (year) {
      match.date = {
        $gte: new Date(year, 0, 1),
        $lt: new Date(year + 1, 0, 1),
      };
    } else if (month) {
      match.date = {
        $gte: new Date(new Date().getFullYear(), month - 1, 1), // Adjust month index (0-based)
        $lt: new Date(new Date().getFullYear(), month, 1),
      };
    } else if (startDate && endDate) {
      match.date = { $gte: new Date(startDate), $lt: new Date(endDate) };
    }

    const expenses = await Expense.find(match);

    const totalExpense = expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );

    return res.status(200).json({ expense: totalExpense });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching total expense." });
  }
};

// Get total expense monthly by year (array)
const getMonthlyExpensesByYear = async (req, res) => {
  const userId = req.params.userId;
  const year = req.query.year || new Date().getFullYear();

  try {
    const match = {
      userId,
      date: {
        $gte: new Date(year, 0, 1),
        $lt: new Date(Number(year) + 1, 0, 1),
      },
    };

    const expenses = await Expense.find(match);

    const groupedExpenses = {};
    expenses.forEach((expense) => {
      const month = expense.date.getMonth() + 1;
      if (!groupedExpenses[month]) {
        groupedExpenses[month] = { total: 0, expenses: [] };
      }
      groupedExpenses[month].total += expense.amount;
    });

    const monthlyExpenses = [];
    for (let month = 1; month <= 12; month++) {
      if (!groupedExpenses[month]) {
        groupedExpenses[month] = { total: 0, expenses: [] };
      }
      monthlyExpenses.push({
        month: Number(month),
        total: groupedExpenses[month].total,
      });
    }

    return res.status(200).json({ monthlyExpenses });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error fetching monthly expenses." });
  }
};

// Get total data dan jumlah berdasarkan kategori
const getExpenseByCategory = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { year, month, startDate, endDate } = req.query;

    let query = { userId };

    if (year && month) {
      query.date = {
        $gte: new Date(year, month - 1, 1),
        $lt: new Date(year, month, 1),
      };
    } else if (year) {
      query.date = {
        $gte: new Date(year, 0, 1),
        $lt: new Date(`${parseInt(year) + 1}-01-01`),
      };
    } else if (month) {
      const currentYear = new Date().getFullYear();
      query.date = {
        $gte: new Date(currentYear, month - 1, 1),
        $lt: new Date(currentYear, month, 1),
      };
    } else if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lt: new Date(endDate) };
    }

    const expenses = await Expense.find(query);

    const result = expenses.reduce((acc, expense) => {
      const { category, amount } = expense;
      acc[category] = acc[category] || { totalAmount: 0, count: 0 };
      acc[category].totalAmount += amount;
      acc[category].count += 1;
      return acc;
    }, {});

    const aggregatedResult = Object.entries(result).map(([category, data]) => ({
      _id: category,
      totalAmount: data.totalAmount,
      count: data.count,
    }));

    res.status(200).json(aggregatedResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createExpense,
  updateExpense,
  deleteExpense,
  getExpenseById,
  getExpensesByUser,
  getTotalExpenseByUser,
  getMonthlyExpensesByYear,
  getExpenseByCategory,
};
