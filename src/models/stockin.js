const mongoose = require('mongoose');

const stockinSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  type: { type: String, default: '' },
});

const Stockin = mongoose.model('Stockin', stockinSchema);

module.exports = Stockin;
