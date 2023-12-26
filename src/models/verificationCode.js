const { model, Schema } = require('mongoose');

const VerificationCodeSchema = new Schema(
  {
    code: { type: String, default: '' },
    entity: { type: Schema.Types.ObjectId, ref: 'Worker' },
    expiryAt: { type: Date },
    type: { type: String, default: '' }, // Like, Comment, Follower, Video
    status: { type: String, default: '' },
  },
  { timestamps: true, versionKey: false }
);

let VerificationCode = new model('VerificationCode', VerificationCodeSchema);
module.exports = VerificationCode;
