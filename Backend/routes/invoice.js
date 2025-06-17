const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

router.post('/generate-invoice', invoiceController.generateInvoice);
router.get('/invoices', invoiceController.listInvoices);

module.exports = router;
