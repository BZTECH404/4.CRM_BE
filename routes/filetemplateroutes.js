const express = require('express');
const router = express.Router();
const fileTemplateController = require('../controller/filetemplatecontroller'); // Adjust path as needed

// Route for creating a new file template
router.post('/', fileTemplateController.createFileTemplate);

// Route for getting all file templates
router.put('/', fileTemplateController.getAllFileTemplates);

// Route for getting a single file template by ID
router.get('/:id', fileTemplateController.getFileTemplateById);

// Route for updating a file template by ID
router.put('/:id', fileTemplateController.updateFileTemplate);

// Route for deleting a file template by ID
router.delete('/:id', fileTemplateController.deleteFileTemplate);

module.exports = router;