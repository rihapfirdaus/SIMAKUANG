const Saving = require("../models/SavingModel.js");

// Create a new saving
const createSaving = async (req, res) => {
  const { userId, amount, category, date, note } = req.body;

  try {
    const saving = new Saving({ userId, amount, category, date, note });
    await saving.save();

    return res
      .status(201)
      .json({ message: "Saving created successfully", saving });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating saving." });
  }
};

// Get all savings for a user with optional filtering by category
const getSavingsByUser = async (req, res) => {
  const userId = req.params.userId;
  const { year, month, startDate, endDate, category } = req.query;

  try {
    let match = { userId }; // Default match only filters by user

    if (category) {
      match.category = category;
    }

    if (year && month) {
      match.date = {
        $gte: new Date(year, month - 1, 1),
        $lt: new Date(year, month, 1),
      };
    } else if (year) {
      match.date = {
        $gte: new Date(year, 0, 1),
        $lt: new Date(year + 1, 0, 1),
      };
    } else if (month) {
      match.date = {
        $gte: new Date(new Date().getFullYear(), month - 1, 1),
        $lt: new Date(new Date().getFullYear(), month, 1),
      };
    } else if (startDate && endDate) {
      match.date = { $gte: new Date(startDate), $lt: new Date(endDate) };
    }

    const savings = await Saving.find(match);

    if (!savings || savings.length === 0) {
      return res.status(404).json({ message: "No savings found for user." });
    }

    return res.status(200).json({ savings });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching savings." });
  }
};

// Update an saving
const updateSaving = async (req, res) => {
  const savingId = req.params.id;
  const userId = req.user.id;
  const { amount, category, date, note } = req.body;

  try {
    const saving = await Saving.findByIdAndUpdate(
      savingId,
      { amount, category, date, note },
      { userId }
    );

    if (!saving) {
      return res.status(404).json({ message: "Saving not found." });
    }

    return res
      .status(200)
      .json({ message: "Saving updated successfully", saving });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating saving." });
  }
};

// Delete an saving
const deleteSaving = async (req, res) => {
  const savingId = req.params.id;
  const userId = req.user.id;

  try {
    const saving = await Saving.findByIdAndDelete(savingId, { userId });

    if (!saving) {
      return res.status(404).json({ message: "Saving not found." });
    }

    return res.status(200).json({ message: "Saving deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting saving." });
  }
};

// Get a specific saving by id
const getSavingById = async (req, res) => {
  const savingId = req.params.id;

  try {
    const saving = await Saving.findById(savingId);

    if (!saving) {
      return res.status(404).json({ message: "Saving not found." });
    }

    return res.status(200).json({ saving });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching saving." });
  }
};

// Get total saving by category
const getTotalSavingByUser = async (req, res) => {
  const userId = req.params.userId;
  const { year, month, startDate, endDate, category } = req.query;

  try {
    let match = { userId }; // Default match only filters by user

    if (category) {
      match.category = category;
    }

    if (year && month) {
      match.date = {
        $gte: new Date(year, month - 1, 1),
        $lt: new Date(year, month, 1),
      };
    } else if (year) {
      match.date = {
        $gte: new Date(year, 0, 1),
        $lt: new Date(year + 1, 0, 1),
      };
    } else if (month) {
      match.date = {
        $gte: new Date(new Date().getFullYear(), month - 1, 1),
        $lt: new Date(new Date().getFullYear(), month, 1),
      };
    } else if (startDate && endDate) {
      match.date = { $gte: new Date(startDate), $lt: new Date(endDate) };
    }

    const savings = await Saving.find(match);

    const totalSaving = savings.reduce((sum, saving) => sum + saving.amount, 0);

    return res.status(200).json({ saving: totalSaving });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching total saving." });
  }
};

// Get total saving monthly by year (array)
const getMonthlySavingsByYear = async (req, res) => {
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

    const savings = await Saving.find(match);

    if (!savings || savings.length === 0) {
      return res.status(404).json({ message: "No savings found for user." });
    }

    // Group savings by month
    const groupedSavings = {};
    savings.forEach((saving) => {
      const month = saving.date.getMonth() + 1; // Months are 0-based in JavaScript Date
      if (!groupedSavings[month]) {
        groupedSavings[month] = { total: 0, savings: [] };
      }
      groupedSavings[month].total += saving.amount;
      groupedSavings[month].savings.push({
        amount: saving.amount,
        date: saving.date,
        category: saving.category,
      });
    });

    // Convert the groupedSavings object to an array
    const monthlySavings = Object.keys(groupedSavings).map((month) => ({
      month: Number(month),
      total: groupedSavings[month].total,
      savings: groupedSavings[month].savings,
    }));

    return res.status(200).json({ monthlySavings });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching monthly savings." });
  }
};

module.exports = {
  createSaving,
  updateSaving,
  deleteSaving,
  getSavingById,
  getSavingsByUser,
  getTotalSavingByUser,
  getMonthlySavingsByYear,
};
