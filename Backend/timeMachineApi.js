const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4011;

app.use(cors());

// Mock time machine snapshots with images/charts and resource links
const snapshots = [
  {
    id: 1,
    date: '2023-06-01',
    type: 'past',
    balance: 25000,
    summary: 'You had just started your savings journey. Most spending was on essentials.',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    link: 'https://www.investopedia.com/saving-money-4689743',
  },
  {
    id: 2,
    date: '2024-01-01',
    type: 'past',
    balance: 80000,
    summary: 'You reached your first big milestone! Savings grew steadily, and you started investing.',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    link: 'https://groww.in/blog/how-to-start-investing',
  },
  {
    id: 3,
    date: '2024-06-01',
    type: 'present',
    balance: 120000,
    summary: 'Current snapshot: You are on track with your goals. Keep up the good work!',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    link: 'https://www.mint.com/saving-goals',
  },
  {
    id: 4,
    date: '2025-06-01',
    type: 'future',
    balance: 250000,
    summary: 'Projected: If you maintain your current habits, you will double your savings in a year!',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
    link: 'https://www.calculator.net/savings-calculator.html',
  },
];

app.get('/api/time-machine', (req, res) => {
  res.json(snapshots);
});

app.listen(PORT, () => {
  console.log(`Time Machine API running on http://localhost:${PORT}`);
});
