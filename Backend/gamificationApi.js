const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4013;

app.use(cors());

// Mock badges/rewards with images and links
const rewards = [
  {
    id: 1,
    name: 'Savings Streak',
    image: 'https://cdn-icons-png.flaticon.com/512/190/190411.png',
    description: 'Saved money for 6 months in a row! Keep the streak alive.',
    link: 'https://www.investopedia.com/saving-money-4689743',
  },
  {
    id: 2,
    name: 'Budget Master',
    image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    description: 'Stayed within your budget for 3 consecutive months.',
    link: 'https://www.mint.com/budgeting-3-months',
  },
  {
    id: 3,
    name: 'Bill Payer Pro',
    image: 'https://cdn-icons-png.flaticon.com/512/633/633611.png',
    description: 'Paid all your bills on time for 12 months.',
    link: 'https://www.nerdwallet.com/article/finance/pay-bills-on-time',
  },
  {
    id: 4,
    name: 'Charity Champion',
    image: 'https://cdn-icons-png.flaticon.com/512/1046/1046857.png',
    description: 'Donated to charity 5 times this year. Giving back feels great!',
    link: 'https://www.giveindia.org/',
  },
];

app.get('/api/gamification', (req, res) => {
  res.json(rewards);
});

app.listen(PORT, () => {
  console.log(`Gamification API running on http://localhost:${PORT}`);
});
