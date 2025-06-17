// Eco Spending API Controller
const ecoSpending = [
  { id: 1, category: 'Transport', ecoScore: 85 },
  { id: 2, category: 'Groceries', ecoScore: 70 }
];

function getEcoSpending(req, res) {
  res.json({ ecoSpending });
}

module.exports = { getEcoSpending };
