const express = require('express');
const router = express.Router();
const newsFeedController = require('../controllers/newsFeedController');

router.get('/api/news-feed', newsFeedController.getNewsFeed);

module.exports = router;
