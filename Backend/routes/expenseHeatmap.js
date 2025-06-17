const express = require('express');
const router = express.Router();
const expenseHeatmapController = require('../controllers/expenseHeatmapController');

router.get('/api/expense-heatmap', expenseHeatmapController.getExpenseHeatmap);

module.exports = router;
