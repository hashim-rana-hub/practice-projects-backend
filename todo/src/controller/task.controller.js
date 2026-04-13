const Task = require("../models/task.model");

const getTasks = async (req, res) => {
  try {
    const { search, completed, page = 1, limit = 10 } = req.query;
    const query = {};

    const skip = (page - 1) * limit;
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
    if (completed !== undefined) {
      query.completed = completed === "true";
    }

    const [tasks, total] = await Promise.all([
      Task.find(query).skip(skip).limit(Number(limit)),
      Task.countDocuments(query),
    ]);
    res.status(200).json({
      total,
      page: Number(page),
      perPage: Number(limit),
      totalPages: Math.ceil(total / limit),
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
    const { title, description, completed } = req.body;

    const task = new Task({
      title,
      description,
      completed: completed !== undefined ? completed : false,
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
