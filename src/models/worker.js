const { model, Schema } = require('mongoose');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const WorkerSchema = new Schema(
  {
    workerNo: { type: String, unique: true, required: true },
    alterNo: { type: String },
    machineNo: { type: String, default: '' },
    name: { type: String, default: '' },
    reference: { type: String, default: '' },
    aadharNo: { type: String, default: '' },
    mobileNo: { type: String, default: '' },
    emailAddress: { type: String, unique: true },
    password: { type: String, select: false },
    mpassword: { type: String, select: false },
    bankDetails: {
      bankAccountName: { type: String, default: '' },
      ifscCode: { type: String, default: '' },
      bankAccountNumber: { type: String, default: '' },
    },
    status: { type: String, default: '' },
    post: { type: Schema.Types.ObjectId, ref: 'Post' },
    role: { type: Schema.Types.ObjectId, ref: 'Role' },
    company: { type: Schema.Types.ObjectId, ref: 'Organization' },
    aadharCard: { type: String, default: '' },
    aadharCardBack: { type: String, default: '' },
    profile: { type: String, default: '' },
    country: { type: String, default: '' },
    state: { type: String, default: '' },
    city: { type: String, default: '' },
    bankPassbook: { type: String, default: '' },
    signature: { type: String, default: '' },
    dateOfBirth: { type: String, default: '' },
    joiningDate: { type: String, default: '' },
    latitude: { type: String, default: '' },
    longitude: { type: String, default: '' },
    blockNo: { type: String, default: '' },
    age: { type: Number, default: 0 },
    workers: [{ type: Schema.Types.ObjectId, ref: 'Worker' }],
  },
  { timestamps: true }
);

//Generate Token
WorkerSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, JWT_SECRET, { expiresIn: '7d' });
  return token;
};

let Worker = new model('Worker', WorkerSchema);
module.exports = Worker;
