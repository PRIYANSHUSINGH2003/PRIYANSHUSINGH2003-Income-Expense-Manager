const express = require('express');
const router = express.Router();
const healthScoreController = require('../controllers/healthScoreController');

router.get('/api/health-score', healthScoreController.getHealthScore);

module.exports = router;
