const mongoose = require('mongoose');

const checkingWorkerReceivedSchema = new mongoose.Schema({
  designId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  reciverName: { type: String, required: true },
  reciveTime: { type: String, required: true },
});

const CheckingWorkerReceived = mongoose.model(
  'CheckingWorkerReceived',
  checkingWorkerReceivedSchema
);

module.exports = CheckingWorkerReceived;
