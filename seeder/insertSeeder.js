const User = require("../models/userModel");
const authLoginSeeding = require("./data/authLogin.json");

const insertSeeder = async () => {
  const checkUserExist = await User.find();

  if (checkUserExist.length > 0) {
    console.log("Default login data already exist!");
  } else {
    await User.deleteMany({});
    await User.insertMany(authLoginSeeding);
    console.log("Default login data successfully added!");
  }
};

module.exports = insertSeeder;
