const { model, Schema } = require('mongoose');

const OrganizationSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

let Organization = new model('Organization', OrganizationSchema);
module.exports = Organization;
