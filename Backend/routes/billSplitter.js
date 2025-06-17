const express = require('express');
const router = express.Router();
const billSplitterController = require('../controllers/billSplitterController');

router.get('/api/bill-splits', billSplitterController.getBillSplits);

module.exports = router;
