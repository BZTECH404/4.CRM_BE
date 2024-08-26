// routes/assetRoutes.js
const express = require('express');
const router = express.Router();
const assetController = require('../controller/assetController');

// API Endpoints
router.get('/assets/:user_id', assetController.getAllAssets);
router.post('/assets', assetController.addAsset);
router.put('/assets/:assetId', assetController.updateAsset);
router.delete('/assets/:assetId', assetController.deleteAsset);

module.exports = router;