const Task = require("../models/task.model");

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({
      total: tasks.length,
      tasks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const idToDelete = req.params.id;
    const taskToDelete = await Task.findByIdAndDelete(idToDelete);
    if (!taskToDelete) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({
      message: "Task deleted successfully",
      name: taskToDelete.title,
      description: taskToDelete.description,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const task = new Task({
      title,
      description,
    });

    await task.save();

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const idToUpdate = req.params.id;
    const { title, description, completed } = req.body;
    const taskToUpdate = await Task.findById(idToUpdate);
    if (!taskToUpdate) {
      return res.status(404).json({ message: "Task not found" });
    }
    taskToUpdate.title = title || taskToUpdate.title;
    taskToUpdate.description = description || taskToUpdate.description;
    taskToUpdate.completed =
      completed !== undefined ? completed : taskToUpdate.completed;
    await taskToUpdate.save();
    res.json(taskToUpdate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTasks, createTask, deleteTask, updateTask };
