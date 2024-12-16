// controllers/assetController.js
const Asset = require('../models/asset');

// Get all assets of a user
exports.getAllAssets = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const assets = await Asset.find({ user_id });
    res.json(assets);
  } catch (error) {
    //////console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Add a new asset for a user
exports.addAsset = async (req, res) => {
  try {
    const { user_id, type, name, amount } = req.body;
    const newAsset = await Asset.create({ user_id, type, name, amount });
    res.json(newAsset);
  } catch (error) {
    //////console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update an existing asset
exports.updateAsset = async (req, res) => {
  try {
    const assetId = req.params.assetId;
    const updatedAsset = await Asset.findByIdAndUpdate(assetId, req.body, { new: true });
    res.json(updatedAsset);
  } catch (error) {
    //////console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete an asset
exports.deleteAsset = async (req, res) => {
  try {
    const assetId = req.params.assetId;
    await Asset.findByIdAndDelete(assetId);
    res.json({ message: 'Asset deleted successfully' });
  } catch (error) {
    //////console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};