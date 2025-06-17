// Anomaly Detector API Controller
// You can later connect this to a MongoDB model if you want to persist data

// Mock anomaly data
const anomalies = [
  {
    id: 1,
    date: '2024-06-10',
    category: 'Dining Out',
    amount: 4500,
    description: 'Unusually high restaurant bill compared to your monthly average.',
    alert: 'https://cdn-icons-png.flaticon.com/512/564/564619.png',
    link: 'https://support.example.com/investigate/1',
  },
  {
    id: 2,
    date: '2024-06-08',
    category: 'Transport',
    amount: 1200,
    description: 'Duplicate charge detected for the same ride.',
    alert: 'https://cdn-icons-png.flaticon.com/512/564/564619.png',
    link: 'https://support.example.com/investigate/2',
  },
  {
    id: 3,
    date: '2024-06-05',
    category: 'Shopping',
    amount: 8000,
    description: 'Large purchase flagged for review.',
    alert: 'https://cdn-icons-png.flaticon.com/512/564/564619.png',
    link: 'https://support.example.com/investigate/3',
  },
];

// GET /api/anomaly-detector
function getAnomalies(req, res) {
  res.json({ anomalies });
}

module.exports = {
  getAnomalies
};
