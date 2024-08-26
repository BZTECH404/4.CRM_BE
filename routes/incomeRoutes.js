// routes/incomeRoutes.js
const express = require('express');
const router = express.Router();
const incomeController = require('../controller/incomeController');

// Create a new income record
router.post('/create', incomeController.createIncome);

// Get all income records
router.put('/', incomeController.getAllIncome);

// Get a single income record by ID
router.get('/:id', incomeController.getIncomeById);

// Update an income record by ID
router.put('/:id', incomeController.updateIncomeById);

// Delete an income record by ID
router.delete('/:id', incomeController.deleteIncomeById);

module.exports = router;