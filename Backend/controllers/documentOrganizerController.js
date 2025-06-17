// Document Organizer API Controller
const documents = [
  { id: 1, name: 'Invoice_June.pdf', type: 'invoice', uploaded: '2024-06-01' },
  { id: 2, name: 'Receipt_May.jpg', type: 'receipt', uploaded: '2024-05-28' }
];

function getDocuments(req, res) {
  res.json({ documents });
}

module.exports = { getDocuments };
