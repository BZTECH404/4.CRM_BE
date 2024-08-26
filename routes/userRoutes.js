// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const { isAuthenticated, authorizeRoles } = require('../middleware/Auth');


// Route for getting all users
router.get('/', userController.getAllUsers);


router.put('/check',isAuthenticated,userController.checkloginvalidity)

// Route for getting a user by ID
router.get('/:id', userController.getUserById);

// Route for creating a new user
router.post('/create', userController.createUser);

router.post('/login', userController.login);

// Route for updating a user
router.put('/:id', userController.updateUser);

// Route for deleting a user
router.delete('/:id', userController.deleteUser);

module.exports = router;