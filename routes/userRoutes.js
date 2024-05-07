const express = require("express");
const router = express.Router();

const { loginUser } = require("../controllers/authControllers");
const { userTask } = require("../controllers/userController");

router.post("/employeeLogin", loginUser);
router.get("/task", userTask);

module.exports = router;
