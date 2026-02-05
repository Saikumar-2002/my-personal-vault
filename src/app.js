const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/notes', require('./routes/notes'));
app.use('/api/v1/categories', require('./routes/categories'));
app.use('/api/v1/tags', require('./routes/tags'));
app.use('/api/v1/images', require('./routes/images'));
app.use('/api/v1/videos', require('./routes/videos'));
app.use('/api/v1/search', require('./routes/search'));

// Serve frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Serve static assets (uploads)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Handle SPA routing (redirect all non-API requests to index.html)
// This enables the frontend to handle its own routing if needed, 
// and ensures accessing /some-page works by serving index.html
app.get('*', (req, res) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
        // If it looks like an API or static file request but wasn't handled, return 404
        return res.status(404).json({ message: 'Not Found' });
    }
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
