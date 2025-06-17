// News Feed API Controller
const axios = require('axios');

// Example: Using GNews free API (https://gnews.io/docs/)
// You need to get a free API key from https://gnews.io/
const GNEWS_API_KEY = process.env.GNEWS_API_KEY || '';
const GNEWS_URL = `https://gnews.io/api/v4/top-headlines?lang=en&token=${GNEWS_API_KEY}`;

async function getNewsFeed(req, res) {
  try {
    if (!GNEWS_API_KEY) {
      return res.status(500).json({ error: 'No GNews API key set in environment variables.' });
    }
    const response = await axios.get(GNEWS_URL);
    // Format the data for the frontend
    const newsFeed = (response.data.articles || []).map(article => ({
      title: article.title,
      date: article.publishedAt,
      summary: article.description,
      url: article.url,
      image: article.image
    }));
    res.json({ newsFeed });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch news feed', details: err.message });
  }
}

module.exports = { getNewsFeed };
