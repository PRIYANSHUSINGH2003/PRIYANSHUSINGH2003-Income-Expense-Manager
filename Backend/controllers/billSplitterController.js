// Bill Splitter API Controller
const billSplits = [
  { id: 1, group: 'Roommates', total: 3000, perPerson: 1000, members: 3 },
  { id: 2, group: 'Friends', total: 4500, perPerson: 1500, members: 3 }
];

function getBillSplits(req, res) {
  res.json({ billSplits });
}

module.exports = { getBillSplits };
