const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  task: { type: String, required: true },
  done: { type: Boolean, default: false },
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = { Task }
