// routes/questionRoutes.js
const express = require('express');
const questionController = require('../controller/questionController');
const router = express.Router();

// Define routes
router.post('/create', questionController.createQuestion);
router.get('/', questionController.getAllQuestions);

router.get('/:id', questionController.getQuestionById);
router.put('/', questionController.getQuestions);
router.put('/:id', questionController.updateQuestion);

router.delete('/:id', questionController.deleteQuestion);

module.exports = router;