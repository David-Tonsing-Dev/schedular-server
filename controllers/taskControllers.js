const Task = require("../models/taskModel");

const addTask = async (req, res) => {
  const { name, description } = req.body;

  try {
    const checkTaskExist = await Task.findOne({ name });

    if (checkTaskExist)
      return res
        .status(200)
        .json({ status: false, message: "Task already exist!" });

    const newTask = await Task({ name, description });
    await newTask.save();

    return res
      .status(200)
      .json({ status: true, message: "Task added successfully!" });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Server error, try again later!",
      error: err.message,
    });
  }
};

const getAllTask = async (req, res) => {
  try {
    const allTask = await Task.find();

    return res.status(200).json({
      status: true,
      message: "All task fetch successfully!",
      tasks: allTask,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Server error, try again later!",
      error: err.message,
    });
  }
};

const updateTask = async (req, res) => {
  const { _id } = req.params;

  try {
    const updatedTask = await Task.findOneAndUpdate({ _id }, req.body, {
      new: true,
    });

    if (!updatedTask)
      return res
        .status(200)
        .json({ status: false, message: "Task does not exist" });

    return res
      .status(200)
      .json({ status: true, message: "Task updated successfully!" });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Server error, try again later!",
      error: err.message,
    });
  }
};

const deleteTask = async (req, res) => {
  const { _id } = req.params;

  try {
    const deletedTask = await Task.findOneAndDelete({ _id }, { new: true });

    if (!deletedTask)
      return res
        .status(200)
        .json({ status: false, message: "Task does not exist!" });

    return res
      .status(200)
      .json({ status: true, message: "Task deleted successfully!" });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Server error, try again later!",
      error: err.message,
    });
  }
};

module.exports = {
  addTask,
  getAllTask,
  updateTask,
  deleteTask,
};
