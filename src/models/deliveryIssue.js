const mongoose = require('mongoose');

const deliveryIssueSchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  billNo: { type: String, required: true },
  partyName: { type: String },
  sizes: [{ type: String }],
  totalPis: { type: Number, required: true },
  authFor: { type: String },
});

const DeliveryIssue = mongoose.model('DeliveryIssue', deliveryIssueSchema);

module.exports = DeliveryIssue;
