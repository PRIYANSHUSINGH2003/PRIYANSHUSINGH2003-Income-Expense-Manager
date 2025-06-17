const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4010;

app.use(cors());

// Mock moodboard entries with images, quotes/goals, and resource links
const moodboard = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
    quote: '“A penny saved is a penny earned.”',
    link: 'https://www.goodreads.com/quotes/1001-a-penny-saved-is-a-penny-earned',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    quote: 'Goal: Save ₹1,00,000 for my dream vacation!',
    link: 'https://www.nomadicmatt.com/travel-blogs/how-to-save-money-for-travel/',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    quote: '“Do not save what is left after spending, but spend what is left after saving.” – Warren Buffett',
    link: 'https://www.goodreads.com/quotes/728-do-not-save-what-is-left-after-spending-but-spend',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
    quote: 'Goal: Build an emergency fund for 6 months of expenses.',
    link: 'https://www.investopedia.com/terms/e/emergency_fund.asp',
  },
];

app.get('/api/moodboard', (req, res) => {
  res.json(moodboard);
});

app.listen(PORT, () => {
  console.log(`Moodboard API running on http://localhost:${PORT}`);
});
