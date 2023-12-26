const { model, Schema } = require("mongoose");
const { TaskStatus } = require("../helper/constant");

const TaskLog = model("TaskLog", {
  timestamp: { type: Number, default: Date.now(), required: true, index: true },
  status: {
    type: String,
    enum: Object.values(TaskStatus),
    required: true,
    index: true,
  },
  task: { type: Schema.Types.ObjectId, ref: "Task", index: true },
  admin: {
    type: Schema.Types.ObjectId,
    ref: "User",
    index: true,
  },
  user: { type: Schema.Types.ObjectId, ref: "User", index: true },
  reason: { type: String },
  fromstatus: { type: String, enum: Object.values(TaskStatus), index: true },
  note: { type: String },
});

module.exports = TaskLog;
