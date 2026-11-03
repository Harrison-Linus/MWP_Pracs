// Load environment variables first
require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// 1. CORS is mandatory for deployed frontends to talk to this backend
app.use(cors({ origin: '*' })); 
app.use(express.json());

// 2. Hide database credentials using process.env
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Cloud MongoDB Connected!'))
  .catch(err => console.error('DB Connection Error:', err));

const Task = mongoose.model('Task', new mongoose.Schema({ title: String }));

app.get('/tasks', async (req, res) => res.json(await Task.find()));
app.post('/tasks', async (req, res) => res.json(await Task.create(req.body)));

// 3. Dynamic Port: Render/Heroku will ignore '5000' and inject their own port here
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));