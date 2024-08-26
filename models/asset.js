// models/asset.js
const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  user_id: { type: Number, required: true,unique:true },
  type: { type: String, enum: ['Equity', 'Fixed Income', 'Alternatives'], required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
});

module.exports = mongoose.model('Asset', assetSchema);