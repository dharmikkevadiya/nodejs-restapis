const { model, Schema } = require('mongoose');

const LoginHistorySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'Worker' },
    latitude: { type: Number, default: 0 },
    longitude: { type: Number, default: 0 },
  },
  { timestamps: true, versionKey: false }
);

let LoginHistory = new model('LoginHistory', LoginHistorySchema);
module.exports = LoginHistory;
