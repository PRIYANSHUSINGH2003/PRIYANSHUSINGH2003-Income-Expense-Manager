const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4006;

app.use(cors());

// Mock eco-spending data with brand logos and links
const ecoSpending = {
  summary: {
    greenPercent: 62,
    totalPurchases: 8,
    greenPurchases: 5,
    nonGreenPurchases: 3,
  },
  purchases: [
    {
      id: 1,
      item: 'Reusable Water Bottle',
      amount: 450,
      brand: 'EcoVessel',
      logo: 'https://cdn.shopify.com/s/files/1/0272/0409/4401/files/EcoVessel_Logo_200x.png',
      ecoScore: 95,
      link: 'https://www.ecovessel.com/pages/sustainability',
      green: true,
    },
    {
      id: 2,
      item: 'Organic Groceries',
      amount: 1200,
      brand: '24 Mantra',
      logo: 'https://www.24mantra.com/wp-content/uploads/2020/07/24mantra_logo.png',
      ecoScore: 90,
      link: 'https://www.24mantra.com/sustainability/',
      green: true,
    },
    {
      id: 3,
      item: 'Fast Fashion T-shirt',
      amount: 600,
      brand: 'H&M',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg',
      ecoScore: 40,
      link: 'https://hmgroup.com/sustainability/',
      green: false,
    },
    {
      id: 4,
      item: 'LED Bulbs',
      amount: 300,
      brand: 'Philips',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Philips_logo_new.svg',
      ecoScore: 85,
      link: 'https://www.signify.com/global/sustainability',
      green: true,
    },
    {
      id: 5,
      item: 'Plastic Bags',
      amount: 50,
      brand: 'Local Store',
      logo: 'https://cdn-icons-png.flaticon.com/512/1046/1046857.png',
      ecoScore: 10,
      link: 'https://www.earthday.org/plastic-pollution/',
      green: false,
    },
  ],
};

app.get('/api/eco-spending', (req, res) => {
  res.json(ecoSpending);
});

app.listen(PORT, () => {
  console.log(`Eco Spending API running on http://localhost:${PORT}`);
});
