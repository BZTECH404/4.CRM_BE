const express = require('express');
const router = express.Router();
const contactController = require('../controller/contactContoller');
const { isAuthenticated, authorizeRoles } = require('../middleware/Auth');


// GET all contacts
router.put('/all', contactController.getAllContacts);

// CREATE a new contact
router.post('/create', contactController.createContact);

// GET a contact by ID
router.get('/contacts/:id', contactController.getContactById);

// UPDATE a contact
router.put('/:id', contactController.updateContact);

// DELETE a contact
router.delete('/:id',isAuthenticated,authorizeRoles('admin'), contactController.deleteContact);

module.exports = router;
