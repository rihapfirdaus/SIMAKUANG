const Income = require("../models/Income"); // Adjust path as needed

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

// Get all incomes for a user
const getIncomesByUser = async (req, res) => {
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
  const { amount, category, date, note } = req.body;

  try {
    const income = await Income.findByIdAndUpdate(incomeId, {
      amount,
      category,
      date,
      note,
    });

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

  try {
    await Income.findByIdAndDelete(incomeId);

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

// Get total income for a user by month (aggregations)
const getTotalIncomeByMonth = async (req, res) => {
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
    const totalIncome = await Income.aggregate([
      { $match: match },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const income = totalIncome[0] ? totalIncome[0].total : 0;

    return res.status(200).json({ income });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching income by month." });
  }
};

// Get total income for a user by year (aggregations)
const getTotalIncomeByYear = async (req, res) => {
  const userId = req.params.userId;
  const year = req.query.year || new Date().getFullYear();

  try {
    const match = {
      userId,
      date: { $gte: new Date(year, 0, 1), $lt: new Date(year + 1, 0, 1) },
    };
    const totalIncome = await Income.aggregate([
      { $match: match },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const income = totalIncome[0] ? totalIncome[0].total : 0;

    return res.status(200).json({ income });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching income by year." });
  }
};

// Get total income for a user by period (aggregations)
const getTotalIncomeByPeriod = async (req, res) => {
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
    const totalIncome = await Income.aggregate([
      { $match: match },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const income = totalIncome[0] ? totalIncome[0].total : 0;

    return res.status(200).json({ income });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error fetching income by period." });
  }
};

// Get array total by month
async function getMonthlyIncome(req, res) {
  const startDate = new Date(req.query.year, req.query.month, 1);
  const endDate = new Date(req.query.year, req.query.month + 1, 0);

  const incomes = await getAllIncomes(req, {
    period: "monthly",
    startDate,
    endDate,
  });

  const monthlyIncomes = incomes.reduce((acc, income) => {
    acc[income.date.getMonth()] += income.amount;
    return acc;
  }, {});

  return res.status(200).json({ monthlyIncomes });
}

// Get array total by week
async function getWeeklyIncome(req, res) {
  const startDate = new Date(req.query.year, req.query.month, req.query.day);
  const endDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate() + 6
  );

  const incomes = await getAllIncomes(req, {
    period: "custom",
    startDate,
    endDate,
  });

  const weeklyIncomes = incomes.reduce((acc, income) => {
    acc[income.date.getWeek()] += income.amount;
    return acc;
  }, {});

  return res.status(200).json({ weeklyIncomes });
}

// Get array total by year
async function getYearlyIncome(req, res) {
  const year = req.query.year;

  const incomes = await getAllIncomes(req, { period: "yearly", year });

  const yearlyIncomes = incomes.reduce((acc, income) => {
    acc[income.date.getFullYear()] += income.amount;
    return acc;
  }, {});

  return res.status(200).json({ yearlyIncomes });
}

module.exports = {
  createIncome,
  getIncomesByUser,
  updateIncome,
  deleteIncome,
  getIncomeById,
  getTotalIncomeByMonth,
  getTotalIncomeByYear,
  getTotalIncomeByPeriod,
  getMonthlyIncome,
  getWeeklyIncome,
  getYearlyIncome,
};
