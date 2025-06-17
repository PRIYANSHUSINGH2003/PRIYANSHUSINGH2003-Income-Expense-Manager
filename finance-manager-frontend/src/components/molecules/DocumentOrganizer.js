import React, { useState } from 'react';

// Dummy data for demonstration
const dummyDocs = [
  {
    id: 1,
    fileName: 'supermarket_receipt_june.pdf',
    vendor: 'Supermarket',
    date: '2024-06-01',
    amount: 1200,
    type: 'Receipt',
  },
  {
    id: 2,
    fileName: 'electricity_bill_may.jpg',
    vendor: 'Electricity Board',
    date: '2024-05-28',
    amount: 2100,
    type: 'Bill',
  },
  {
    id: 3,
    fileName: 'bank_statement_apr.pdf',
    vendor: 'Bank',
    date: '2024-04-30',
    amount: 0,
    type: 'Statement',
  },
];

const unique = (arr, key) => [...new Set(arr.map(x => x[key]))];

const DocumentOrganizer = () => {
  const [docs, setDocs] = useState(dummyDocs);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  // Simulate upload
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // Dummy auto-tagging
    const newDoc = {
      id: Date.now(),
      fileName: file.name,
      vendor: 'Unknown',
      date: new Date().toISOString().slice(0, 10),
      amount: 0,
      type: file.name.toLowerCase().includes('bill') ? 'Bill' : file.name.toLowerCase().includes('receipt') ? 'Receipt' : 'Other',
    };
    setDocs([newDoc, ...docs]);
  };

  // Filtered docs
  const filteredDocs = docs.filter(doc =>
    (search === '' || doc.vendor.toLowerCase().includes(search.toLowerCase()) || doc.fileName.toLowerCase().includes(search.toLowerCase())) &&
    (typeFilter === '' || doc.type === typeFilter)
  );

  return (
    <div className="rounded-2xl shadow-xl bg-white/40 backdrop-blur-md p-6 w-full max-w-2xl mx-auto mt-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Document Organizer</h2>
      <div className="mb-4 flex flex-col md:flex-row gap-2 items-center">
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="block w-full md:w-auto text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          onChange={handleUpload}
        />
        <input
          type="text"
          placeholder="Search by vendor or file name..."
          className="w-full md:w-56 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 bg-white/70"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="w-full md:w-32 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 bg-white/70"
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
        >
          <option value="">All Types</option>
          {unique(docs, 'type').map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
      <ul className="space-y-4">
        {filteredDocs.length === 0 && <li className="text-gray-500">No documents found.</li>}
        {filteredDocs.map(doc => (
          <li key={doc.id} className="p-4 rounded-xl bg-white/70 shadow flex flex-col md:flex-row md:items-center gap-2 border-l-4 border-blue-400">
            <div className="flex-1">
              <div className="font-semibold text-gray-800">{doc.fileName}</div>
              <div className="text-xs text-gray-500">Vendor: {doc.vendor}</div>
              <div className="text-xs text-gray-500">Date: {doc.date}</div>
              {doc.amount > 0 && <div className="text-xs text-gray-500">Amount: ₹{doc.amount}</div>}
              <div className="text-xs text-blue-600 font-medium">{doc.type}</div>
            </div>
            <button className="py-2 px-4 rounded-lg bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition">
              View
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4 text-gray-600 text-sm">
        <span>Tip: Upload your bills, receipts, and statements for easy search and retrieval. Auto-tagging improves with more uploads!</span>
      </div>
    </div>
  );
};

export default DocumentOrganizer;
