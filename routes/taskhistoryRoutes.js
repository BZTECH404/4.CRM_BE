const express = require('express');
const router = express.Router();
const taskhistoryController = require('../controller/taskhistoryController');

// Task routes
router.put('/:id', taskhistoryController.updateTaskHistory);
router.delete('/:id',taskhistoryController.deleteTaskHistory)
router.post('/create/:id', taskhistoryController.addTaskHistory); // Create a new task
router.get('/:id', taskhistoryController.getAllTaskHistories); // Get a task by ID
router.get('/single/:id', taskhistoryController.getTaskHistoryById);
module.exports = router;