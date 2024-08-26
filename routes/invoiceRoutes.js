const express = require('express');
const router = express.Router();
const invoiceController = require('../controller/invoiceController');

// Create a new invoice
router.post('/create', invoiceController.createInvoice);

// Get all invoices
router.put('/', invoiceController.getAllInvoices);

// update amount_paid by invoices
router.get('/bills',invoiceController.updateInvoicebyBills)

// Get a single invoice by ID
router.get('/invoices/:id', invoiceController.getInvoiceById);

// Update an existing invoice
router.put('/:id', invoiceController.updateInvoice);

// Delete an invoice
router.delete('/:id', invoiceController.deleteInvoice);

module.exports = router;
