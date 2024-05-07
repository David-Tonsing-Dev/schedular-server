const mongoose = require("mongoose");

const assignSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employee",
    },
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "task",
    },
    officeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "office",
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AssignTask = mongoose.model("assignTask", assignSchema);

module.exports = AssignTask;
