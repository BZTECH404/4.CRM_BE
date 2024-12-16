const express = require('express');
const router = express.Router();
const templateController = require('../controller/templateController');

// Create a new template
router.post('/create', templateController.createTemplate);

// Get all templates
router.put('/', templateController.getAllTemplates);

// Get a single template by ID
router.get('/:id', templateController.getTemplateById);

// Update a template by ID
router.put('/:id', templateController.updateTemplate);

// Delete a template by ID
router.delete('/:id', templateController.deleteTemplate);

module.exports = router;
