// Backend: Node.js with Express (server.js)
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

// Database Connection
mongoose.connect('mongodb+srv://priyanshusingh00004:110044@cluster0.zy000zt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    serverSelectionTimeoutMS: 5000, // Adjusted timeout for server selection
    socketTimeoutMS: 45000, // Consider increasing socket timeout
    connectTimeoutMS: 30000,
});

// Serve profile images statically
app.use('/profile_images', express.static('profile_images'));

// Mount modular routes
app.use('/', require('./routes/auth'));
app.use('/', require('./routes/finance'));
app.use('/', require('./routes/invoice'));
app.use('/', require('./routes/charity'));
app.use('/', require('./routes/anomalyDetector'));
app.use('/', require('./routes/newsFeed'));
app.use('/', require('./routes/moodboard'));
app.use('/', require('./routes/healthScore'));
app.use('/', require('./routes/gamification'));
app.use('/', require('./routes/expenseHeatmap'));
app.use('/', require('./routes/ecoSpending'));
app.use('/', require('./routes/documentOrganizer'));
app.use('/', require('./routes/billSplitter'));
app.use('/', require('./routes/billNegotiator'));

// Serve profile images statically
app.use('/profile_images', express.static('profile_images'));

// Start Server
app.listen(5000, () => console.log('Server running on port 5000'));
