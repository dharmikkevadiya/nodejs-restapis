const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  designId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true,
  },
  size: [{ title: String }],
  stockInPic: { type: String },
  finalPis: { type: String },
  programDetails: [
    {
      avg: { type: String },
      balanceMtr: { type: String },
      cut: { type: String },
      kurti: { type: String },
      usedMtr: { type: String },
    },
  ],
  remark: [{ type: String }],
});

const Program = mongoose.model('Program', programSchema);

module.exports = Program;
