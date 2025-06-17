const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4012;

app.use(cors());

// Mock shared wallets with avatars, roles, and invite/profile links
const wallets = [
  {
    id: 1,
    walletName: 'Family Wallet',
    balance: 54000,
    invite: 'https://app.example.com/invite/family123',
    members: [
      {
        name: 'Amit',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        role: 'Admin',
        profile: 'https://wa.me/919999999999',
      },
      {
        name: 'Priya',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        role: 'Member',
        profile: 'https://wa.me/919888888888',
      },
      {
        name: 'Rahul',
        avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
        role: 'Member',
        profile: 'https://wa.me/919777777777',
      },
    ],
  },
  {
    id: 2,
    walletName: 'Roommates Wallet',
    balance: 12000,
    invite: 'https://app.example.com/invite/roomies456',
    members: [
      {
        name: 'Sonia',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        role: 'Admin',
        profile: 'https://wa.me/919666666666',
      },
      {
        name: 'Vikram',
        avatar: 'https://randomuser.me/api/portraits/men/23.jpg',
        role: 'Member',
        profile: 'https://wa.me/919555555555',
      },
    ],
  },
];

app.get('/api/shared-wallets', (req, res) => {
  res.json(wallets);
});

app.listen(PORT, () => {
  console.log(`Shared Wallet API running on http://localhost:${PORT}`);
});
