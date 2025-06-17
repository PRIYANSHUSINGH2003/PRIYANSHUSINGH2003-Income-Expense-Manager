// Moodboard API Controller
const moodboard = [
  { id: 1, mood: 'Optimistic', color: '#4caf50', message: 'You are on track with your savings!' },
  { id: 2, mood: 'Cautious', color: '#ff9800', message: 'Watch your discretionary spending.' }
];

function getMoodboard(req, res) {
  res.json({ moodboard });
}

module.exports = { getMoodboard };
