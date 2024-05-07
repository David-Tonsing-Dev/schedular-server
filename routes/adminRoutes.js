const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const {
  uploadFile,
  addEmployee,
  getAllEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/adminControllers");

const {
  addOffice,
  getAllOffice,
  updateOffice,
  deleteOffice,
} = require("../controllers/officeControllers");

const {
  addTask,
  getAllTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskControllers");

const {
  addAssignTask,
  getAllAssignTask,
  updateAssignTask,
  deleteAssignTask,
} = require("../controllers/assignTaskControllers");

const { loginAdmin } = require("../controllers/authControllers");

router.post("/login", loginAdmin);

router.post("/add/employee", authMiddleware, uploadFile, addEmployee);
router.get("/get/all-employee", authMiddleware, getAllEmployee);
router.patch(
  "/update/employee/:_id",
  authMiddleware,
  uploadFile,
  updateEmployee
);
router.delete("/remove/employee/:_id", authMiddleware, deleteEmployee);

router.post("/add/office", authMiddleware, addOffice);
router.get("/get/all-office", authMiddleware, getAllOffice);
router.patch("/update/office/:_id", authMiddleware, updateOffice);
router.delete("/remove/office/:_id", authMiddleware, deleteOffice);

router.post("/add/task", authMiddleware, addTask);
router.get("/get/all-task", authMiddleware, getAllTask);
router.patch("/update/task/:_id", authMiddleware, updateTask);
router.delete("/remove/task/:_id", authMiddleware, deleteTask);

router.post("/add/assignTask", authMiddleware, addAssignTask);
router.get("/get/allAssignTask", authMiddleware, getAllAssignTask);
router.patch("/update/assignTask/:_id", authMiddleware, updateAssignTask);
router.delete("/remove/assignTask/:_id", authMiddleware, deleteAssignTask);

module.exports = router;
