const Debt = require("../models/DebtModel.js");

// Create a new debt
const createDebt = async (req, res) => {
  const userId = req.params.userId;
  const { debtor, creditor, amount, category, dueDate, status, note } =
    req.body;

  try {
    const debt = new Debt({
      userId,
      debtor,
      creditor,
      amount,
      category,
      dueDate,
      status,
      note,
    });
    await debt.save();

    return res.status(201).json({ message: "Debt created successfully", debt });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating debt." });
  }
};

// Get all debts for a user (optional filtering)
const getDebtsByUser = async (req, res) => {
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

    const debts = await Debt.find(match);

    if (!debts) {
      return res.status(404).json({ message: "No debts found for user." });
    }

    return res.status(200).json({ debts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching debts." });
  }
};

// Update an debt
const updateDebt = async (req, res) => {
  const debtId = req.params.id;
  const userId = req.user.id;
  const { debtor, creditor, amount, category, dueDate, status, note } =
    req.body;

  try {
    const debt = await Debt.findByIdAndUpdate(
      debtId,
      { debtor, creditor, amount, category, dueDate, status, note },
      { userId }
    );

    if (!debt) {
      return res.status(404).json({ message: "Debt not found." });
    }

    return res.status(200).json({ message: "Debt updated successfully", debt });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating debt." });
  }
};

// Delete an debt
const deleteDebt = async (req, res) => {
  const debtId = req.params.id;
  const userId = req.user.id;

  try {
    const debt = await Debt.findByIdAndDelete(debtId, { userId });

    if (!debt) {
      return res.status(404).json({ message: "Debt not found." });
    }

    return res.status(200).json({ message: "Debt deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting debt." });
  }
};

// Get a specific debt by id
const getDebtById = async (req, res) => {
  const debtId = req.params.id;

  try {
    const debt = await Debt.findById(debtId);

    if (!debt) {
      return res.status(404).json({ message: "Debt not found." });
    }

    return res.status(200).json({ debt });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching debt." });
  }
};

// Get total debt
const getTotalDebtByUser = async (req, res) => {
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

    const debts = await Debt.find(match);

    const totalDebt = debts.reduce((sum, debt) => sum + debt.amount, 0);

    return res.status(200).json({ debt: totalDebt });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching total debt." });
  }
};

// Get total debt monthly by year (array)
const getMonthlyDebtsByYear = async (req, res) => {
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

    const debts = await Debt.find(match);

    const groupedDebts = {};
    debts.forEach((debts) => {
      const month = debts.date.getMonth() + 1;
      if (!groupedDebts[month]) {
        groupedDebts[month] = { total: 0, debts: [] };
      }
      groupedDebts[month].total += debts.amount;
    });

    const monthlyDebts = [];
    for (let month = 1; month <= 12; month++) {
      if (!groupedDebts[month]) {
        groupedDebts[month] = { total: 0, debts: [] };
      }
      monthlyDebts.push({
        month: Number(month),
        total: groupedDebts[month].total,
      });
    }

    return res.status(200).json({ monthlyDebts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching monthly debts." });
  }
};

module.exports = {
  createDebt,
  updateDebt,
  deleteDebt,
  getDebtById,
  getDebtsByUser,
  getTotalDebtByUser,
  getMonthlyDebtsByYear,
};
