// Health Score API Controller
const healthScore = {
  score: 82,
  grade: 'B+',
  advice: 'Good job! Try to save a bit more each month.'
};

function getHealthScore(req, res) {
  res.json({ healthScore });
}

module.exports = { getHealthScore };
