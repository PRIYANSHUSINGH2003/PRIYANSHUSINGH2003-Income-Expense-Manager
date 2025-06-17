const express = require('express');
const router = express.Router();
const charityController = require('../controllers/charityController');

// GET /api/charity-impact
router.get('/api/charity-impact', charityController.getCharityImpact);

module.exports = router;
