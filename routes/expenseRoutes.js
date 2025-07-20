const express = require('express');
const router = express.Router();
const expenseController = require('../controller/expenseController');

// API Endpoints
router.post('/create', expenseController.createExpense);
router.get('/', expenseController.getAllExpenses);

// router.get('/:id', expensesinvoiceController.getAllExpenseInvoices);
// router.put('/:id', expensesinvoiceController.updateExpensesInvoiceById);

// router.delete('/:id', expensesinvoiceController.deleteExpensesInvoiceById);

module.exports = router;
