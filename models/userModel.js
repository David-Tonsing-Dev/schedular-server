const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      minlength: 3,
      maxlength: 50,
      required: true,
    },
    email: {
      type: String,
      minlength: 4,
      maxlength: 50,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 4,
      maxlength: 1024,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
