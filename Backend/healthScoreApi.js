const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4004;

app.use(cors());

// Mock financial health score and tips
const healthScore = {
  score: 72,
  breakdown: {
    spending: 65,
    saving: 80,
    debt: 60,
    investment: 85,
  },
  tips: [
    {
      title: 'Increase Emergency Fund',
      description: 'Boost your emergency savings to cover at least 6 months of expenses.',
      icon: 'https://cdn-icons-png.flaticon.com/512/190/190411.png',
      link: 'https://www.investopedia.com/terms/e/emergency_fund.asp',
    },
    {
      title: 'Reduce Credit Card Debt',
      description: 'Pay off high-interest credit cards to improve your debt score.',
      icon: 'https://cdn-icons-png.flaticon.com/512/633/633611.png',
      link: 'https://www.nerdwallet.com/article/finance/pay-off-credit-card-debt',
    },
    {
      title: 'Automate Investments',
      description: 'Set up automatic monthly investments to grow your wealth.',
      icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      link: 'https://groww.in/blog/automate-your-investments',
    },
  ],
};

app.get('/api/health-score', (req, res) => {
  res.json(healthScore);
});

app.listen(PORT, () => {
  console.log(`Health Score API running on http://localhost:${PORT}`);
});
