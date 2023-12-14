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
  const userId = req.user.id;
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
  const userId = req.user.id;

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

    if (!expenses || expenses.length === 0) {
      return res.status(404).json({ message: "No expenses found for user." });
    }

    // Group expenses by month
    const groupedExpenses = {};
    expenses.forEach((expense) => {
      const month = expense.date.getMonth() + 1; // Months are 0-based in JavaScript Date
      if (!groupedExpenses[month]) {
        groupedExpenses[month] = { total: 0, expenses: [] };
      }
      groupedExpenses[month].total += expense.amount;
      groupedExpenses[month].expenses.push({
        amount: expense.amount,
        date: expense.date,
        category: expense.category,
      });
    });

    // Convert the groupedExpenses object to an array
    const monthlyExpenses = Object.keys(groupedExpenses).map((month) => ({
      month: Number(month),
      total: groupedExpenses[month].total,
      expenses: groupedExpenses[month].expenses,
    }));

    return res.status(200).json({ monthlyExpenses });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error fetching monthly expenses." });
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
};
