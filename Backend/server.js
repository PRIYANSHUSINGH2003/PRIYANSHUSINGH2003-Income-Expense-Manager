// Backend: Node.js with Express (server.js)
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {
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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
