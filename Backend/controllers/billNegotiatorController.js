// Bill Negotiator API Controller
const negotiations = [
  { id: 1, vendor: 'Internet Provider', status: 'Success', saved: 500 },
  { id: 2, vendor: 'Electricity', status: 'Pending', saved: 0 }
];

function getNegotiations(req, res) {
  res.json({ negotiations });
}

module.exports = { getNegotiations };
