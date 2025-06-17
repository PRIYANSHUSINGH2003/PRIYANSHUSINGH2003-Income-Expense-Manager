const express = require('express');
const router = express.Router();
const gamificationController = require('../controllers/gamificationController');

router.get('/api/gamification', gamificationController.getRewards);

module.exports = router;
