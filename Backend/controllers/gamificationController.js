// Gamification API Controller
const rewards = [
  { id: 1, name: 'Savings Streak', points: 100, achieved: true },
  { id: 2, name: 'Expense Tracker', points: 50, achieved: false }
];

function getRewards(req, res) {
  res.json({ rewards });
}

module.exports = { getRewards };
