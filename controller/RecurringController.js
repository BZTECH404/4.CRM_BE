const Recurring = require('../models/Recurring');
const ExpenseInvoice = require('../models/expenseinvoice');
const mongoose = require('mongoose');

exports.createRecurring = async (req, res) => {
    try {
        console.log(req.body)
        const recurring = await Recurring.create(req.body);
        res.status(201).json(recurring);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.getAllRecurrings = async (req, res) => {
    try {
        const recurring = await Recurring.find();
        res.status(200).json(recurring);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.getRecurringById = async (req, res) => {
    try {
        const recurring = await Recurring.findById(req.params.id);
        res.status(200).json(recurring);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


exports.updateRecurring = async (req, res) => {
    try {
        console.log(req.body)
        const recurring = await Recurring.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(recurring);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteRecurring = async (req, res) => {
    try {
        const recurring = await Recurring.findById(req.params.id);
        const resp = await Recurring.findByIdAndUpdate(req.params.id, { isDisabled: !recurring.isDisabled }, { new: true });
        console.log(resp)
        res.status(200).json({ message: 'Deleted Successfully' });
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message });
    }
};

exports.createEntry = async (req, res) => {
    try {

        if (req.body.typeofrec == 'ExpenseInvoice') {
            let body = {
                project: req.body.project,
                amount: req.body.amount,
                type: req.body.type,
                person: req.body.person,
                subject: req.body.subject,
                recurring: req.body.recurring
            }
            const expenseInvoice = new ExpenseInvoice({
                ...body
            });
            await expenseInvoice.save();
            console.log("here")
            res.status(201).send(expenseInvoice);
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message });
    }
}