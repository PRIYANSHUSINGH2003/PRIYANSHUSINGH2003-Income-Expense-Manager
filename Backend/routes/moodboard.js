const express = require('express');
const router = express.Router();
const moodboardController = require('../controllers/moodboardController');

router.get('/api/moodboard', moodboardController.getMoodboard);

module.exports = router;
