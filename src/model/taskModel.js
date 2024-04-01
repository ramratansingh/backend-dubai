const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  dueAt: {
    type: Date,
  },
  assignTo: String,
  category: {
    type: String,
    required: true
  },  
  status: {
    type: String,
    enum: ["Pending", "Completed"]
  }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;