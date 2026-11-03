// Step 2: Set up Express server
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// Step 3: Connect to local MongoDB database
// (Make sure MongoDB is installed and running on your machine)
mongoose.connect('mongodb://127.0.0.1:27017/taskdb')
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => console.log('Database error:', err));

// Step 4: Define a Task model using Mongoose
const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false }
});
const Task = mongoose.model('Task', taskSchema);

// Step 5 & 6: POST /tasks → Create a task
app.post('/tasks', async (req, res) => {
    const newTask = await Task.create(req.body);
    res.status(201).json(newTask);
});

// Step 7: GET /tasks → List all tasks
app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// Step 8: GET /tasks/:id → Get a task by ID
app.get('/tasks/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
});

// Step 9: PUT /tasks/:id → Update a task
app.put('/tasks/:id', async (req, res) => {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
});

// Step 10: DELETE /tasks/:id → Delete a task
app.delete('/tasks/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task successfully deleted' });
});

// Start the server
app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});