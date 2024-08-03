const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ejskitchen');

// Define Menu Item Schema
const menuItemSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    image: String,
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

// Routes
app.get('/api/menu-items', async (req, res) => {
    try {
        const menuItems = await MenuItem.find();
        res.json(menuItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

