import Income from "../models/IncomeModel.js";

export const getIncomes = async (req, res) => {
  try {
    const userId = req.params.userId;
    const incomes = await Income.find({ userId });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getIncomeById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const income = await Income.findOne({
      _id: req.params.id,
      userId,
    });
    if (income) {
      res.status(200).json(income);
    } else {
      res.status(404).json({ message: "Income not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getIncomesByMonth = async (req, res) => {
  const { userId, year, month } = req.params;

  try {
    const parsedMonth = parseInt(month);
    const nextMonth = parsedMonth < 12 ? parsedMonth + 1 : 1;
    const nextYear = parsedMonth < 12 ? year : parseInt(year) + 1;

    const incomes = await Income.find({
      userId,
      date: {
        $gte: new Date(`${year}-${month}-01`),
        $lt: new Date(`${nextYear}-${nextMonth}-01`),
      },
    });

    res.json(incomes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getIncomesByYear = async (req, res) => {
  const { userId, year } = req.params;

  try {
    const incomes = await Income.find({
      userId,
      date: {
        $gte: new Date(`${year}-01-01`),
        $lt: new Date(`${parseInt(year) + 1}-01-01`),
      },
    });

    res.json(incomes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getIncomesByPeriod = async (req, res) => {
  const { userId, startDate, endDate } = req.params;

  try {
    const incomes = await Income.find({
      userId,
      date: {
        $gte: new Date(startDate),
        $lt: new Date(`${parseInt(endDate) + 1}`),
      },
    });

    res.json(incomes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const saveIncome = async (req, res) => {
  const { amount, category, date, note } = req.body;
  const userId = req.params.userId;

  try {
    const newIncome = new Income({
      userId,
      amount,
      category,
      date,
      note,
    });

    const savedIncome = await newIncome.save();
    res.status(201).json(savedIncome);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateIncome = async (req, res) => {
  const { amount, category, date, note } = req.body;
  const userId = req.params.userId;

  try {
    const updatedIncome = await Income.findOneAndUpdate(
      { _id: req.params.id, userId },
      { amount, category, date, note },
      { new: true }
    );

    if (updatedIncome) {
      res.json(updatedIncome);
    } else {
      res.status(404).json({ message: "Income not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteIncome = async (req, res) => {
  try {
    const userId = req.params.userId;
    const deletedIncome = await Income.findOneAndDelete({
      _id: req.params.id,
      userId,
    });

    if (deletedIncome) {
      res.json(deletedIncome);
    } else {
      res.status(404).json({ message: "Income not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
