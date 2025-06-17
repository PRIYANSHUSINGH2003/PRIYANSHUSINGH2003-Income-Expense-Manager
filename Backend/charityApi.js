const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4003;

app.use(cors());

// Mock charity donations with logos and links
const donations = [
  {
    id: 1,
    charity: 'GiveIndia',
    logo: 'https://assets.giveindia.org/images/giveindia-logo.png',
    description: 'Supporting education, healthcare, and disaster relief across India.',
    amount: 1500,
    date: '2024-05-10',
    url: 'https://www.giveindia.org/',
  },
  {
    id: 2,
    charity: 'Akshaya Patra',
    logo: 'https://www.akshayapatra.org/wp-content/themes/akshayapatra/images/logo.png',
    description: 'Mid-day meals for underprivileged children.',
    amount: 1000,
    date: '2024-04-22',
    url: 'https://www.akshayapatra.org/',
  },
  {
    id: 3,
    charity: 'CRY',
    logo: 'https://www.cry.org/wp-content/themes/cry/images/logo.png',
    description: 'Child Rights and You: Ensuring happier childhoods.',
    amount: 500,
    date: '2024-03-15',
    url: 'https://www.cry.org/',
  },
];

app.get('/api/charity-donations', (req, res) => {
  res.json(donations);
});

app.listen(PORT, () => {
  console.log(`Charity API running on http://localhost:${PORT}`);
});
