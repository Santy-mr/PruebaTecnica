import express from 'express';
import path from 'path';
import { getAllUsers, getUserById, createUser } from './config/database.js';
import { fileURLToPath } from 'url';

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

app.get('/', async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching users' });
    }
});

app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await getUserById(id);
        if (user) {
            res.json({ success: true, data: user });
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching user' });
    }
});

app.post('/users', async (req, res) => {
    try {
        const newUser = await createUser(req.body);
        res.status(201).json({ success: true, message:"User Created", data: newUser });
    } catch (error) {
        if(error.message === 'Username already exists') {
            res.status(400).json({ success: false, message: error.message });
        } else {
            res.status(500).json({ success: false, message: 'Error creating user' });
        }
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});