const express = require('express');
const router = express.Router();
const recurringController = require('../controller/RecurringController');
// create man entry
router.put('/centry', recurringController.createEntry);
// Create a new recurring entry
router.post('/create', recurringController.createRecurring);

// Get all recurring entries
router.get('/', recurringController.getAllRecurrings);

// Get a recurring entry by ID
router.get('/:id', recurringController.getRecurringById);


// Update a recurring entry
router.put('/:id', recurringController.updateRecurring);

// Delete a recurring entry
router.delete('/:id', recurringController.deleteRecurring);


module.exports = router;

