const Task = require('../models/Task');

// controllers/taskController.js

// Create Task
exports.createTask = async (req, res) => {
  try {
    const { name, description } = req.body;
    const task = new Task({ name, description }); // Assuming `req.user._id` exists
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Failed to create task' });
  }
};


// Get Tasks by User
exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.status(200).json(tasks);
};

// Update Task Status
exports.updateTaskStatus = async (req, res) => {
  const { taskId, status } = req.body;
  const task = await Task.findByIdAndUpdate(taskId, { status }, { new: true });
  res.status(200).json(task);
};

// Delete Task
exports.deleteTask = async (req, res) => {
  const { taskId } = req.params;
  await Task.findByIdAndDelete(taskId);
  res.status(200).json({ message: 'Task deleted' });
};
