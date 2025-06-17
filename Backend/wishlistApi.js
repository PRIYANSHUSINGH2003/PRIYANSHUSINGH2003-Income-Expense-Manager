const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4001;

app.use(cors());
app.use(express.json());

// Mock product database
const products = {
  'https://example.com/headphones': {
    name: 'Noise Cancelling Headphones',
    currentPrice: 2799,
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
  },
  'https://example.com/desk': {
    name: 'Standing Desk',
    currentPrice: 13500,
    imageUrl: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
  },
  'https://example.com/laptop': {
    name: 'Ultrabook Laptop',
    currentPrice: 49999,
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
  },
};

app.post('/api/product-info', (req, res) => {
  const { url } = req.body;
  if (products[url]) {
    return res.json(products[url]);
  }
  // Fallback for unknown URLs
  return res.json({
    name: 'Unknown Product',
    currentPrice: Math.floor(Math.random() * 10000) + 1000,
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  });
});

app.listen(PORT, () => {
  console.log(`Wishlist API running on http://localhost:${PORT}`);
});
