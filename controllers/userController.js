const taskAssign = require("../seeder/data/taskAssign.json");

const userTask = async (req, res) => {
  return res.status(200).json({ task: taskAssign });
};

module.exports = { userTask };
