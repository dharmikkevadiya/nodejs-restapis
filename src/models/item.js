const { model, Schema, default: mongoose } = require('mongoose');
const { ProcessStatus } = require('../helper/constant');

const ItemSchema = new Schema(
  {
    addDate: { type: Date, required: true },
    challanNo: { type: String, required: true },
    designId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Stockin',
      required: true,
    },
    programId: { type: mongoose.Schema.Types.ObjectId, ref: 'Program' },
    workerIssueId: { type: mongoose.Schema.Types.ObjectId, ref: 'WorkerIssue' },
    checkingWorkerReceivedId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CheckingWorkerReceived',
    },
    checkingWorkerIssueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CheckingWorkerIssue',
    },
    pressIssueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PressIssue',
    },
    deliverIssueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DeliveryIssue',
    },
    l: { type: String },
    panna: { type: String },
    programPis: { type: String },
    details: [
      {
        kurti: { type: String },
        cut: { type: String },
        taka: { type: String },
        mtr: { type: String },
        totlaPis: { type: String },
      },
    ],
    patti: [
      {
        patti: { type: String },
        mtr: { type: String },
        line: { type: String },
        cut: { type: String },
        taka: { type: String },
        totalPis: { type: String },
      },
    ],
    gala: {
      pis: [
        {
          progrmaPis: { type: String },
          mtr: { type: String },
          cut: { type: String },
          taka: { type: String },
        },
      ],
      mtr: [
        {
          programPis: { type: String },
          taka: { type: String },
          totalPis: { type: String },
        },
      ],
    },
    dupatta: [
      {
        dupatta: { type: String },
        taka: { type: String },
        totalPis: { type: String },
      },
    ],
    partyName: { type: String },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
    workerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker' },
    challanPic: [{ type: String }],
    mtrDetailPic: [{ type: String }],
    cuttingSizeRatioPic: [{ type: String }],
    itemCreatorPic: { type: String },
    process: {
      type: String,
      enum: Object.values(ProcessStatus),
      required: true,
      index: true,
      default: 'Pending',
    },
  },
  { timestamps: true }
);

let Item = new model('Item', ItemSchema);
module.exports = Item;
