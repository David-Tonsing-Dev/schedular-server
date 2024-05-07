const mongoose = require("mongoose");

const officeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 50,
      unique: true,
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

const Office = mongoose.model("office", officeSchema);

module.exports = Office;
