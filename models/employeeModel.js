const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  city: String,
  street: String,
  zip: Number,
  state: String,
  country: String,
});

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlenght: 3,
      maxlength: 50,
      required: true,
    },
    email: {
      type: String,
      minlength: 4,
      maxlength: 30,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 8,
      maxlenght: 1024,
      required: true,
    },
    address: {
      type: addressSchema,
    },
    hireDate: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
    },
    idProof: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("employee", employeeSchema);

module.exports = Employee;
