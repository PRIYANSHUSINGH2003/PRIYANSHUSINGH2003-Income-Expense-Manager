const express = require('express');
const router = express.Router();
const ecoSpendingController = require('../controllers/ecoSpendingController');

router.get('/api/eco-spending', ecoSpendingController.getEcoSpending);

module.exports = router;
