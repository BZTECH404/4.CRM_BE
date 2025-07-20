const express = require('express');
const router = express.Router();
const expensesinvoiceController = require('../controller/expenseInvoiceController');

// API Endpoints
router.put('/:id', expensesinvoiceController.updateExpenseInvoice);
router.post('/create', expensesinvoiceController.createExpenseInvoice);
router.get('/', expensesinvoiceController.getAllExpenseInvoices);

// router.get('/:id', expensesinvoiceController.getAllExpenseInvoices);

router.delete('/:id', expensesinvoiceController.deleteExpenseInvoice);

module.exports = router;
