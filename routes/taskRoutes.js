const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskController');
const { isAuthenticated, authorizeRoles } = require('../middleware/Auth');

// Task routes
router.post('/create', taskController.createTask); // Create a new task
router.put('/filter', taskController.findTasksByFilter)
router.get('/', taskController.getAllTasks); // Get all tasks
router.get('/nooftasks',taskController.numberoftask)
router.get('/:projectid', taskController.getTaskById); // Get a single task by ID
router.put('/:id', taskController.updateTask); // Update a task
router.delete('/:id',isAuthenticated,authorizeRoles('admin'), taskController.deleteTask); // Delete a task
router.get('/all/:id', taskController.getAllTasksForUser); // Get tasks by user ID
router.put('/complete/:id', taskController.markTaskAsComplete)
router.get('/incomplete/:id', taskController.getAllIncompleteTasks)
router.get('/complete/:id', taskController.getAllCompletedTasks)



module.exports = router;