const express = require('express');
const router = express.Router();
const setController = require('../controller/setController');

// Routes
router.post('/sets', setController.createSet);
router.get('/sets', setController.getSets);
router.get('/sets/:id', setController.getSetById);
router.put('/sets/:id', setController.updateSet);
router.delete('/sets/:id', setController.deleteSet);

module.exports = router;
