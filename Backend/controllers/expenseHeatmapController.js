// Expense Heatmap API Controller
const heatmap = [
  { date: '2024-06-01', amount: 1200 },
  { date: '2024-06-02', amount: 800 },
  { date: '2024-06-03', amount: 1500 }
];

function getExpenseHeatmap(req, res) {
  res.json({ heatmap });
}

module.exports = { getExpenseHeatmap };
