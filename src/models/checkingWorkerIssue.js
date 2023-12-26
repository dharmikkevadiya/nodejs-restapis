const mongoose = require('mongoose');

const checkingWorkerIssueSchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  designId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true,
  },
  details: [
    {
      size: { type: String },
      pis: { type: String },
      rate: { type: String },
    },
  ],
  rejectPis: [
    {
      size: { type: String },
      pis: { type: String },
      description: { type: String },
    },
  ],
  checkrName: { type: String, required: true },
  checkrPic: { type: String },
});

const CheckingWorkerIssue = mongoose.model(
  'CheckingWorkerIssue',
  checkingWorkerIssueSchema
);

module.exports = CheckingWorkerIssue;
