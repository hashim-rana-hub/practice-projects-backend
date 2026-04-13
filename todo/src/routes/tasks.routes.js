const express = require("express");
const router = express.Router();
const {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} = require("../controller/task.controller");

router.get("/tasks", getTasks);
router.post("/task", createTask);
router.delete("/task/:id", deleteTask);
router.patch("/task/:id", updateTask);
module.exports = router;
