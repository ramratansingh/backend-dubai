// taskRouter.js
const express = require('express');
const Task = require('../model/taskModel');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// Create a new task
router.post('/task', async (req, res) => {
  try {
    // Appending parameter to the req.body object
    req.body.id = uuidv4();
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all tasks
router.get('/tasks', async (req, res) => {
  try {
    // check assigned To
    const assignedTo = req.query.assignedTo;
    // check category
    const category = req.query.category;
    if(assignedTo){
      // fetch data by assigned to
      const tasks = await Task.find({ assignTo: assignedTo });
      res.status(201).json(tasks);
    }
    else if(category){
      // fetch data by category
      const tasks = await Task.find({ category: category });
      res.status(201).json(tasks);
    }
    else{
      // fetch all data
      const tasks = await Task.find();
      res.status(201).json(tasks);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a task by ID
router.get('/task/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update a task by ID
router.put('/task/:id', async (req, res) => {
  const taskId = req.params.id;
  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a task by ID
router.delete('/task/:id', async (req, res) => {
  const taskId = req.params.id;
  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
