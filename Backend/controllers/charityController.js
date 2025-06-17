// Charity API Controller
// You can later connect this to a MongoDB model if you want to persist data

// Mock charity impact data
const charityImpacts = [
  {
    id: 1,
    name: 'Clean Water Project',
    donated: 5000,
    impact: 'Provided clean water to 100 families',
    date: '2024-06-01'
  },
  {
    id: 2,
    name: 'Education Fund',
    donated: 2000,
    impact: 'Sponsored 10 children for a year',
    date: '2024-05-15'
  }
];

// GET /api/charity-impact
function getCharityImpact(req, res) {
  res.json({ charityImpacts });
}

module.exports = {
  getCharityImpact
};
