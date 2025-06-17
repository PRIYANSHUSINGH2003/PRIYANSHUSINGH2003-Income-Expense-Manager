const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4005;

app.use(cors());

// Mock bill splits with avatars and payment/profile links
const bills = [
  {
    id: 1,
    billName: 'Dinner at Olive',
    total: 3600,
    friends: [
      {
        name: 'Amit',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        profile: 'https://wa.me/919999999999',
        owed: 1200,
        payment: 'upi://pay?pa=amit@upi',
        settled: false,
      },
      {
        name: 'Priya',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        profile: 'https://wa.me/919888888888',
        owed: 1200,
        payment: 'upi://pay?pa=priya@upi',
        settled: true,
      },
      {
        name: 'Rahul',
        avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
        profile: 'https://wa.me/919777777777',
        owed: 1200,
        payment: 'upi://pay?pa=rahul@upi',
        settled: false,
      },
    ],
  },
  {
    id: 2,
    billName: 'Netflix Subscription',
    total: 800,
    friends: [
      {
        name: 'Sonia',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        profile: 'https://wa.me/919666666666',
        owed: 400,
        payment: 'upi://pay?pa=sonia@upi',
        settled: true,
      },
      {
        name: 'Vikram',
        avatar: 'https://randomuser.me/api/portraits/men/23.jpg',
        profile: 'https://wa.me/919555555555',
        owed: 400,
        payment: 'upi://pay?pa=vikram@upi',
        settled: false,
      },
    ],
  },
];

app.get('/api/bill-splits', (req, res) => {
  res.json(bills);
});

app.listen(PORT, () => {
  console.log(`Bill Splitter API running on http://localhost:${PORT}`);
});
