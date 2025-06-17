const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4007;

app.use(cors());

// Mock tax estimate and tips
const taxEstimate = {
  income: 850000,
  deductions: 150000,
  taxable: 700000,
  estimatedTax: 45500,
  tips: [
    {
      title: 'Maximize Section 80C',
      description: 'Invest up to ₹1.5 lakh in PPF, ELSS, or life insurance to reduce taxable income.',
      icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      link: 'https://cleartax.in/s/section-80c-deductions',
    },
    {
      title: 'Claim HRA Benefits',
      description: 'If you pay rent, claim House Rent Allowance for additional tax savings.',
      icon: 'https://cdn-icons-png.flaticon.com/512/190/190411.png',
      link: 'https://cleartax.in/s/house-rent-allowance-hra',
    },
    {
      title: 'E-File Your Return',
      description: 'Use the official portal to e-file your tax return quickly and securely.',
      icon: 'https://cdn-icons-png.flaticon.com/512/633/633611.png',
      link: 'https://www.incometax.gov.in/iec/foportal/',
    },
  ],
};

app.get('/api/tax-estimate', (req, res) => {
  res.json(taxEstimate);
});

app.listen(PORT, () => {
  console.log(`Tax Estimator API running on http://localhost:${PORT}`);
});
