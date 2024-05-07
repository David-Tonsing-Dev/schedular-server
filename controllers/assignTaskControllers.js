const AssignTask = require("../models/assignTaskModel");

const addAssignTask = async (req, res) => {
  const { userId, taskId, officeId, startDate, endDate } = req.body;

  try {
    const newTask = await AssignTask({
      userId,
      taskId,
      officeId,
      startDate,
      endDate,
    });
    await newTask.save();

    return res
      .status(200)
      .json({ status: true, message: "Task assign successfully!" });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Server error, try again later!",
      error: err.message,
    });
  }
};

const getAllAssignTask = async (req, res) => {
  try {
    const allTask = await AssignTask.find()
      .populate("officeId")
      .populate("taskId")
      .populate("userId");

    return res.status(200).json({
      status: true,
      message: "Assign task fetched successfully!",
      tasks: allTask,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      massage: "Server error, try again later!",
      error: err.message,
    });
  }
};

const updateAssignTask = async (req, res) => {
  const { _id } = req.params;

  try {
    const updatedUserTask = await AssignTask.findOneAndUpdate(
      { _id },
      req.body,
      { new: true }
    );

    if (!updatedUserTask)
      return res
        .status(200)
        .json({ status: false, message: "Assign user task does not exist!" });

    return res.status(200).json({
      status: true,
      message: "User assigned task updated!",
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Server error, try again later!",
      error: err.message,
    });
  }
};

const deleteAssignTask = async (req, res) => {
  const { _id } = req.params;

  const deletedAssignTask = await AssignTask.findOneAndDelete(
    { _id },
    { new: true }
  );

  if (!deletedAssignTask)
    return res
      .status(200)
      .json({ status: false, message: "User assign task does not exist!" });

  return res
    .status(200)
    .json({ status: true, message: "User assign task deleted!" });
};

module.exports = {
  addAssignTask,
  getAllAssignTask,
  updateAssignTask,
  deleteAssignTask,
};
