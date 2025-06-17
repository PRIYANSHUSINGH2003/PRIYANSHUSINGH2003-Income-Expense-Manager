const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4008;

app.use(cors());

// Mock personalized news feed
const newsFeed = [
  {
    id: 1,
    title: 'How to Save More on Groceries in 2024',
    summary: 'Discover new strategies and apps to cut your grocery bill by up to 20% this year.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    link: 'https://www.moneycontrol.com/news/business/personal-finance/how-to-save-on-groceries-2024-1234567.html',
  },
  {
    id: 2,
    title: 'Best Credit Cards for Online Shopping',
    summary: 'Compare the top credit cards for cashback and rewards on your favorite e-commerce sites.',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    link: 'https://www.bankbazaar.com/credit-card/best-credit-cards-for-online-shopping.html',
  },
  {
    id: 3,
    title: 'Eco-Friendly Brands to Watch in 2024',
    summary: 'Support sustainability with these top-rated green brands making a difference.',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
    link: 'https://www.ecowatch.com/eco-friendly-brands-2024.html',
  },
  {
    id: 4,
    title: 'How to File Your Taxes Online in Minutes',
    summary: 'A step-by-step guide to e-filing your taxes quickly and securely.',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    link: 'https://cleartax.in/s/efile-income-tax-return-guide',
  },
];

app.get('/api/news-feed', (req, res) => {
  res.json(newsFeed);
});

app.listen(PORT, () => {
  console.log(`News Feed API running on http://localhost:${PORT}`);
});
