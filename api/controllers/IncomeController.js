const Income = require("../models/IncomeModel.js");

// Create a new income
const createIncome = async (req, res) => {
  const { userId, amount, category, date, note } = req.body;

  try {
    const income = new Income({ userId, amount, category, date, note });
    await income.save();

    return res
      .status(201)
      .json({ message: "Income created successfully", income });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating income." });
  }
};

// Get all incomes for a user (optional filtering)
const getIncomesByUser = async (req, res) => {
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

    const incomes = await Income.find(match);

    if (!incomes) {
      return res.status(404).json({ message: "No incomes found for user." });
    }

    return res.status(200).json({ incomes });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching incomes." });
  }
};

// Update an income
const updateIncome = async (req, res) => {
  const incomeId = req.params.id;
  const userId = req.user.id;
  const { amount, category, date, note } = req.body;

  try {
    const income = await Income.findByIdAndUpdate(
      incomeId,
      { amount, category, date, note },
      { userId }
    );

    if (!income) {
      return res.status(404).json({ message: "Income not found." });
    }

    return res
      .status(200)
      .json({ message: "Income updated successfully", income });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating income." });
  }
};

// Delete an income
const deleteIncome = async (req, res) => {
  const incomeId = req.params.id;
  const userId = req.user.id;

  try {
    const income = await Income.findByIdAndDelete(incomeId, { userId });

    if (!income) {
      return res.status(404).json({ message: "Income not found." });
    }

    return res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting income." });
  }
};

// Get a specific income by id
const getIncomeById = async (req, res) => {
  const incomeId = req.params.id;

  try {
    const income = await Income.findById(incomeId);

    if (!income) {
      return res.status(404).json({ message: "Income not found." });
    }

    return res.status(200).json({ income });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching income." });
  }
};

// Get total income
const getTotalIncomeByUser = async (req, res) => {
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

    const incomes = await Income.find(match);

    const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);

    return res.status(200).json({ income: totalIncome });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching total income." });
  }
};

// Get total income monthly by year (array)
const getMonthlyIncomesByYear = async (req, res) => {
  const userId = req.params.userId;
  const { year } = req.query;

  try {
    const match = {
      userId,
      date: {
        $gte: new Date(year, 0, 1),
        $lt: new Date(Number(year) + 1, 0, 1),
      },
    };

    const incomes = await Income.find(match);

    if (!incomes || incomes.length === 0) {
      return res.status(404).json({ message: "No incomes found for user." });
    }

    // Group incomes by month
    const groupedIncomes = {};
    incomes.forEach((income) => {
      const month = income.date.getMonth() + 1; // Months are 0-based in JavaScript Date
      if (!groupedIncomes[month]) {
        groupedIncomes[month] = { total: 0, incomes: [] };
      }
      groupedIncomes[month].total += income.amount;
      groupedIncomes[month].incomes.push({
        amount: income.amount,
        date: income.date,
        category: income.category,
      });
    });

    // Convert the groupedIncomes object to an array
    const monthlyIncomes = Object.keys(groupedIncomes).map((month) => ({
      month: Number(month),
      total: groupedIncomes[month].total,
      incomes: groupedIncomes[month].incomes,
    }));

    return res.status(200).json({ monthlyIncomes });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching monthly incomes." });
  }
};

module.exports = {
  createIncome,
  updateIncome,
  deleteIncome,
  getIncomeById,
  getIncomesByUser,
  getTotalIncomeByUser,
  getMonthlyIncomesByYear,
};
