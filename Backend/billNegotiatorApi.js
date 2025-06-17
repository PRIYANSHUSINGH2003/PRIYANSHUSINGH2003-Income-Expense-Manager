const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4014;

app.use(cors());

// Mock recurring bills with provider logos and negotiation/contact links
const bills = [
  {
    id: 1,
    provider: 'Airtel',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Airtel_logo.svg',
    type: 'Internet',
    amount: 1200,
    suggestion: 'You may be eligible for a lower plan or loyalty discount. Try negotiating!',
    contact: 'https://www.airtel.in/support/',
  },
  {
    id: 2,
    provider: 'LIC',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/LIC_Logo.svg',
    type: 'Insurance',
    amount: 3500,
    suggestion: 'Ask about new plans or premium waivers for loyal customers.',
    contact: 'https://licindia.in/Customer-Services/Contact-Us',
  },
  {
    id: 3,
    provider: 'Tata Power',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Tata_Power_Logo.svg',
    type: 'Electricity',
    amount: 2100,
    suggestion: 'Check if you qualify for a green energy or off-peak discount.',
    contact: 'https://www.tatapower.com/contact-us.aspx',
  },
];

app.get('/api/bill-negotiator', (req, res) => {
  res.json(bills);
});

app.listen(PORT, () => {
  console.log(`Bill Negotiator API running on http://localhost:${PORT}`);
});
