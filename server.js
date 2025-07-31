// Load environment variables
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// Setup express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON body
app.use(bodyParser.json());

// MongoDB connection using Mongoose
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Task model (you can move this to models/Task.js if preferred)
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, default: 'pending' }
});
const Task = mongoose.model('Task', taskSchema);

// POST /tasks - Save task from JSON body
app.post('/tasks', async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const newTask = new Task({ title, description, status });
    await newTask.save();

    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save task' });
  }
});

// GET /add-task - Save task via query params (for browser testing)
app.get('/add-task', async (req, res) => {
  try {
    const { title, description, status } = req.query;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const newTask = new Task({ title, description, status });
    await newTask.save();

    res.status(201).json({ message: 'Task saved via GET', task: newTask });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save task via GET' });
  }
});

// Optional: 404 fallback for unknown routes
app.use((req, res) => {
  res.status(404).send('Route not found');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
