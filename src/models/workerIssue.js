const mongoose = require('mongoose');

const workerIssueSchema = new mongoose.Schema({
  designId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true,
  },
  workerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Worker',
    required: true,
  },
  alterNo: { type: String },
  time: { type: String },
  date: { type: String },
  size: { type: String },
  issuePis: { type: String },
  totalPis: { type: String },
});

const WorkerIssue = mongoose.model('WorkerIssue', workerIssueSchema);

module.exports = WorkerIssue;
