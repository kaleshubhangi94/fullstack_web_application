// models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Completed', 'Done'], default: 'Pending' },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
