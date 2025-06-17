const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4002;

app.use(cors());

// Mock geo-tagged expenses with images and Google Maps links
const expenses = [
  {
    id: 1,
    place: 'Connaught Place',
    lat: 28.6315,
    lng: 77.2167,
    totalSpent: 3200,
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    mapsUrl: 'https://www.google.com/maps?q=Connaught+Place+Delhi',
  },
  {
    id: 2,
    place: 'DLF Mall of India',
    lat: 28.5672,
    lng: 77.3210,
    totalSpent: 2100,
    imageUrl: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    mapsUrl: 'https://www.google.com/maps?q=DLF+Mall+of+India',
  },
  {
    id: 3,
    place: 'Cyber Hub',
    lat: 28.4974,
    lng: 77.0888,
    totalSpent: 4500,
    imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80',
    mapsUrl: 'https://www.google.com/maps?q=Cyber+Hub+Gurgaon',
  },
];

app.get('/api/expense-heatmap', (req, res) => {
  res.json(expenses);
});

app.listen(PORT, () => {
  console.log(`Expense Heatmap API running on http://localhost:${PORT}`);
});
