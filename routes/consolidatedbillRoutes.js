// routes/consolidatedRoutes.js
const express = require('express');
const router = express.Router();
const consolidatedController = require('../controller/consolidatedBillcontroller');

// Create a new consolidated entry
router.post('/create', consolidatedController.createConsolidated);

// Get all consolidated entries
router.get('/', consolidatedController.getAllConsolidated);

// Get a specific consolidated entry by ID
router.get('/:id', consolidatedController.getConsolidatedById);

// Update a consolidated entry
router.put('/:id', consolidatedController.updateConsolidated);

// Delete a consolidated entry
router.delete('/:id', consolidatedController.deleteConsolidated);

// Disable entry
router.put('/disable/:id', consolidatedController.disabledConsolidated);


module.exports = router;
