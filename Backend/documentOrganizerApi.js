const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4009;

app.use(cors());

// Mock uploaded documents with OCR tags, preview images, and download links
const documents = [
  {
    id: 1,
    fileName: 'supermarket_receipt_june.pdf',
    preview: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
    vendor: 'Supermarket',
    date: '2024-06-01',
    amount: 1200,
    link: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    id: 2,
    fileName: 'electricity_bill_may.jpg',
    preview: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    vendor: 'Electricity Board',
    date: '2024-05-28',
    amount: 2100,
    link: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    id: 3,
    fileName: 'bank_statement_apr.pdf',
    preview: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    vendor: 'Bank',
    date: '2024-04-30',
    amount: 0,
    link: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
];

app.get('/api/documents', (req, res) => {
  res.json(documents);
});

app.listen(PORT, () => {
  console.log(`Document Organizer API running on http://localhost:${PORT}`);
});
