const express = require('express');
const router = express.Router();
const billNegotiatorController = require('../controllers/billNegotiatorController');

router.get('/api/bill-negotiator', billNegotiatorController.getNegotiations);

module.exports = router;
