const Office = require("../models/officeModel");

const addOffice = async (req, res) => {
  const { name, description } = req.body;

  try {
    const checkOfficeExist = await Office.findOne({ name });

    if (checkOfficeExist)
      return res
        .status(200)
        .json({ status: false, message: "Office already exist!" });

    const newOffice = await Office({ name, description });
    await newOffice.save();

    return res
      .status(200)
      .json({ status: true, message: "Office added successfully!" });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Server error, try again later!",
      error: err.message,
    });
  }
};

const getAllOffice = async (req, res) => {
  try {
    const allOffice = await Office.find();

    return res.status(200).json({
      status: true,
      message: "All office fetch successfully!",
      offices: allOffice,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Server error, try again later!",
      error: err.message,
    });
  }
};

const updateOffice = async (req, res) => {
  const { _id } = req.params;

  try {
    const updatedOffice = await Office.findOneAndUpdate({ _id }, req.body, {
      new: true,
    });

    if (!updatedOffice)
      return res
        .status(200)
        .json({ status: false, message: "Office does not exist" });

    return res
      .status(200)
      .json({ status: true, message: "Office updated successfully!" });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Server error, try again later!",
      error: err.message,
    });
  }
};

const deleteOffice = async (req, res) => {
  const { _id } = req.params;

  try {
    const deletedOffice = await Office.findOneAndDelete({ _id }, { new: true });

    if (!deletedOffice)
      return res
        .status(200)
        .json({ status: false, message: "Office does not exist!" });

    return res
      .status(200)
      .json({ status: true, message: "Office deleted successfully!" });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Server error, try again later!",
      error: err.message,
    });
  }
};

module.exports = {
  addOffice,
  getAllOffice,
  updateOffice,
  deleteOffice,
};
