const ExpenseInvoice = require('../models/expenseinvoice');

exports.createExpenseInvoice = async (req, res) => {
    try {
        // console.log(req.body)
        const expenseInvoice = new ExpenseInvoice({
            ...req.body
        });
        await expenseInvoice.save();
        res.status(201).send(expenseInvoice);
    } catch (err) {
        res.status(400).send(err);
    }
}

exports.getExpenseInvoiceById = async (req, res) => {
    try {
        const expenseInvoice = await ExpenseInvoice.findById(req.params.id);
        if (!expenseInvoice) {
            return res.status(404).send();
        }
        res.send(expenseInvoice);
    } catch (err) {
        res.status(500).send(err);
    }
}

exports.getAllExpenseInvoices = async (req, res) => {
    try {
        const expenseInvoices = await ExpenseInvoice.find().sort({ createdAt: -1 });
        res.send(expenseInvoices);
    } catch (err) {
        res.status(500).send(err);
    }
}

exports.updateExpenseInvoice = async (req, res) => {
    try {
        console.log(req.body)
        const expenseInvoice = await ExpenseInvoice.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        console.log(expenseInvoice)
        if (!expenseInvoice) {
            return res.status(404).send();
        }
        res.status(200).send(expenseInvoice);
    } catch (err) {
        console.log(err)
        res.status(400).send(err);
    }
}

exports.deleteExpenseInvoice = async (req, res) => {
    try {
        const expenseInvoice = await ExpenseInvoice.findById(req.params.id);
        const resp = await ExpenseInvoice.findByIdAndUpdate(req.params.id, { isDisabled: !expenseInvoice.isDisabled }, { new: true });
        if (!expenseInvoice) {
            return res.status(404).send();
        }
        // console.log(resp)
        res.send(resp);
    } catch (err) {
        res.status(500).send(err);
    }
}
