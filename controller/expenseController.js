const Expense = require('../models/expense');


exports.createExpense = async (req, res) => {
  try {
    console.log(req.body)
    const expense = new Expense(req.body);
    await expense.save();
    res.status(201).send(expense);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 });
    // console.log(expenses)
    res.send(expenses);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).send();
    }
    res.send(expense);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updateExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!expense) {
      return res.status(404).send();
    }
    res.send(expense);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deleteExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndRemove(req.params.id);
    if (!expense) {
      return res.status(404).send();
    }
    res.send(expense);
  } catch (err) {
    res.status(500).send(err);
  }
};
