// routes/taskRoutes.js
const express = require('express');
const { createTask, getTasks, updateTaskStatus, deleteTask } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// POST request for creating a task
router.post('/tasks',  createTask);

// GET request for fetching all tasks
router.get('/tasks',  getTasks);

// PUT request for updating the status of a task
router.put('/tasks/status',  updateTaskStatus);

// DELETE request for deleting a task
router.delete('/tasks/:taskId',  deleteTask);

module.exports = router;
