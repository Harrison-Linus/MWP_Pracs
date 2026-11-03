const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Step 1 & 2: For password hashing
const jwt = require('jsonwebtoken'); // Step 2: For token generation

const app = express();
app.use(express.json());

// Step 1: Connect to Database & Create User Schema
mongoose.connect('mongodb://127.0.0.1:27017/authDB');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', UserSchema);

const JWT_SECRET = 'supersecretkey_mwp_lab'; // Keep this hidden in production

// --- Step 1: User Registration ---
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Hash password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Store user in MongoDB
        const newUser = await User.create({ username, password: hashedPassword });
        res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        res.status(400).json({ error: "Registration failed" });
    }
});

// --- Step 2: User Login ---
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    // Verify password using bcrypt.compare
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Invalid credentials" });
    }
    
    // Generate JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    
    // Send token to frontend
    res.json({ message: "Login successful", token });
});

app.listen(5000, () => console.log('Auth Server running on http://localhost:5000'));
