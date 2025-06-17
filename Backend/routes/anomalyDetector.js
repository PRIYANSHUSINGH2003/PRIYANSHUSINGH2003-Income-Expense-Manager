const express = require('express');
const router = express.Router();
const anomalyDetectorController = require('../controllers/anomalyDetectorController');

// GET /api/anomaly-detector
router.get('/api/anomaly-detector', anomalyDetectorController.getAnomalies);

module.exports = router;
