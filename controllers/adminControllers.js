const multer = require("multer");
const bcrypt = require("bcrypt");
const Employee = require("../models/employeeModel");
const upload = require("../middlewares/multer");

const uploadFile = function (req, res, next) {
  upload.fields([
    { name: "idProof", maxCount: 1 },
    { name: "profilePic", maxCount: 1 },
  ])(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(200).json({
          status: false,
          message: "File too large. Max file size is 2MB",
        });
      }
      return res
        .status(500)
        .json({ status: false, message: "Internal Server Error" });
    } else if (err) {
      return res
        .status(500)
        .json({ status: false, message: "Internal Server Error" });
    }
    next();
  });
};

const addEmployee = async (req, res) => {
  try {
    let { name, email, password, address, hireDate, role } = req.body;
    const profilePic = req.files["profilePic"][0];
    const idProof = req.files["idProof"][0];
    address = JSON.parse(address);

    const checkEmpEmail = await Employee.findOne({ email });

    if (checkEmpEmail)
      return res
        .status(200)
        .json({ status: false, message: "Email already exist!" });

    let newEmp = new Employee({
      name,
      email,
      password,
      address,
      hireDate,
      role,
      profilePic: profilePic.filename,
      idProof: idProof.filename,
    });

    const salt = await bcrypt.genSalt(10);
    newEmp.password = await bcrypt.hash(newEmp.password, salt);

    await newEmp.save();

    return res
      .status(200)
      .json({ status: true, message: "Employee added successfully!" });
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({
      status: false,
      message: "Something went wrong, please try again later!",
      error: err.message,
    });
  }
};

const updateEmployee = async (req, res) => {
  try {
    let { _id } = req.params;
    let { name, email, password, address, hireDate, role } = req.body;

    const profilePic = req.files["profilePic"][0];
    const idProof = req.files["idProof"][0];
    address = JSON.parse(address);

    const updatedData = {
      name,
      email,
      password,
      address,
      hireDate,
      role,
      profilePic: profilePic.filename,
      idProof: idProof.filename,
    };

    const checkEmpEmail = await Employee.findOneAndUpdate(
      { _id },
      updatedData,
      {
        new: true,
      }
    );

    if (!checkEmpEmail)
      return res
        .status(200)
        .json({ status: false, message: "Employee does not exist!" });

    return res
      .status(200)
      .json({ status: true, message: "Employee updated successfully!" });
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({
      status: false,
      message: "Something went wrong, please try again later!",
      error: err.message,
    });
  }
};

const deleteEmployee = async (req, res) => {
  const { _id } = req.params;

  try {
    const deleteEmpl = await Employee.findOneAndDelete({ _id }, { new: true });

    if (!deleteEmpl)
      return res.status(200).json({
        status: false,
        message: "Something went wrong, cannot delete employee!",
      });

    res
      .status(200)
      .json({ status: true, message: "Employee deleted successfully!" });
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({
      status: false,
      message: "Server error, try again later!",
      error: err.message,
    });
  }
};

const getAllEmployee = async (req, res) => {
  try {
    const getAllEmployee = await Employee.find({});

    return res.status(200).json({
      status: true,
      message: "Employees fetch successfully!",
      employees: getAllEmployee,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Something went wrong, try again later!",
      error: err.message,
    });
  }
};

module.exports = {
  uploadFile,
  addEmployee,
  getAllEmployee,
  updateEmployee,
  deleteEmployee,
};
