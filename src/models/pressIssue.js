const mongoose = require('mongoose');

const pressIssueSchema = new mongoose.Schema({
  date: { type: String },
  time: { type: String },
  details: {
    size: { type: String },
    pis: { type: String },
  },
  rejectPis: [
    {
      size: { type: String },
      pis: { type: String },
      description: { type: String },
    },
  ],
  finalPis: { type: String },
  totalAmount: { type: String },
});

const PressIssue = mongoose.model('PressIssue', pressIssueSchema);

module.exports = PressIssue;
