const express = require('express')
const mongoose = require('mongoose')
const { Task } = require('../models/tasks.js')

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const fetchedTasks = await Task.find({});
    res.send(fetchedTasks);
  } catch (error) {
    console.error('Error retrieving tasks:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/', async (req, res) => {
  try {
    console.log('Request body :', req.body);
    const { task } = req.body;
    
    const newTask = new Task({
      _id: new mongoose.Types.ObjectId(),
      task: task,
      done: false,
    });

    const savedTask = await newTask.save();

    res.status(201).json(savedTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
        
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid task ID' });
    }

    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully', deletedTask });

  } catch (error) { 
    console.error('Error deleting task:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
