// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Crucial for connecting to React

const app = express();
app.use(express.json());
app.use(cors()); // Allows frontend to talk to this backend

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/taskdb');

// Define Schema and Model
const Task = mongoose.model('Task', new mongoose.Schema({ title: String }));

// Step 2 & 3: API Endpoints returning JSON
app.get('/tasks', async (req, res) => res.json(await Task.find()));

app.post('/tasks', async (req, res) => res.json(await Task.create(req.body)));

app.delete('/tasks/:id', async (req, res) => res.json(await Task.findByIdAndDelete(req.params.id)));

app.listen(5000, () => console.log('Backend running on http://localhost:5000'));