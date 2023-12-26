const { model, Schema } = require('mongoose');

const RoleSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

let Role = new model('Role', RoleSchema);
module.exports = Role;
