const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 50,
      required: true,
    },
    description: {
      type: String,
      minlength: 3,
      maxlength: 1024,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("task", taskSchema);

module.exports = Task;
