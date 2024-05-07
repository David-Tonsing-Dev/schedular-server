const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const Employee = require("../models/employeeModel");

const createToken = (_id, userName, email) => {
  const jwtKey = process.env.JWT_SECRET_KEY;
  return jwt.sign({ _id, userName, email }, jwtKey, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      return res
        .status(400)
        .json({ status: false, message: "All fields are required!" });

    const user = await Employee.findOne({ email });

    if (!user)
      return res
        .status(200)
        .json({ status: false, message: "Invalid email or password" });

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword)
      return res
        .status(200)
        .json({ status: false, message: "Invalid email or password" });

    const token = createToken(user._id, user.userName, email);

    return res.status(200).json({
      status: true,
      message: "Login successfully!",
      _id: user._id,
      userName: user.userName,
      token,
      email,
    });
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({
      status: false,
      message: "Something went wrong, try again later!",
      data: err,
    });
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      return res
        .status(400)
        .json({ status: false, message: "All fields are required!" });

    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(200)
        .json({ status: false, message: "Invalid email or password" });

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword)
      return res
        .status(200)
        .json({ status: false, message: "Invalid email or password" });

    const token = createToken(user._id, user.userName, email);

    return res.status(200).json({
      status: true,
      message: "Login successfully!",
      _id: user._id,
      userName: user.userName,
      token,
      email,
    });
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({
      status: false,
      message: "Something went wrong, try again later!",
      data: err,
    });
  }
};

module.exports = {
  loginUser,
  loginAdmin,
};
