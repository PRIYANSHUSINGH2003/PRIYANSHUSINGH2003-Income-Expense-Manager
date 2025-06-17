const express = require('express');
const router = express.Router();
const documentOrganizerController = require('../controllers/documentOrganizerController');

router.get('/api/documents', documentOrganizerController.getDocuments);

module.exports = router;
