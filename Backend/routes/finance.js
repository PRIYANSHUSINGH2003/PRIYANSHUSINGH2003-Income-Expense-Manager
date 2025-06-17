const express = require('express');
const router = express.Router();
const financeController = require('../controllers/financeController');

router.post('/stock', financeController.addStock);
router.get('/stock', financeController.getStock);
router.post('/income-expense', financeController.addIncomeExpense);
router.get('/income-expense', financeController.getIncomeExpense);

module.exports = router;
