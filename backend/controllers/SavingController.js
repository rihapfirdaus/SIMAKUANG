const Saving = require("../models/SavingModel.js");

exports.getSavings = async (req, res) => {
  try {
    const userId = req.params.userId;
    const savings = await Saving.find({ userId });
    res.status(200).json(savings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSavingById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const saving = await Saving.findOne({
      _id: req.params.id,
      userId,
    });
    if (saving) {
      res.status(200).json(saving);
    } else {
      res.status(404).json({ message: "Saving not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.saveSaving = async (req, res) => {
  const { lender, amount, dueDate, status, note } = req.body;
  const userId = req.params.userId;

  try {
    const newSaving = new Saving({
      userId,
      lender,
      amount,
      dueDate,
      status,
      note,
    });

    const savedSaving = await newSaving.save();
    res.status(201).json(savedSaving);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateSaving = async (req, res) => {
  const { lender, amount, dueDate, status, note } = req.body;
  const userId = req.params.userId;

  try {
    const updatedSaving = await Saving.findOneAndUpdate(
      { _id: req.params.id, userId },
      { lender, amount, dueDate, status, note },
      { new: true }
    );

    if (updatedSaving) {
      res.json(updatedSaving);
    } else {
      res.status(404).json({ message: "Saving not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteSaving = async (req, res) => {
  try {
    const userId = req.params.userId;
    const deletedSaving = await Saving.findOneAndDelete({
      _id: req.params.id,
      userId,
    });

    if (deletedSaving) {
      res.json(deletedSaving);
    } else {
      res.status(404).json({ message: "Saving not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
