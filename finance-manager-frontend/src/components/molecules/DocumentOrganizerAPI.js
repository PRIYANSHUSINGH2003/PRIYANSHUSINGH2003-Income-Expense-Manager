import React, { useEffect, useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL_DOCUMENTS || 'http://localhost:4009/api/documents';

const DocumentOrganizerAPI = () => {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDocs = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setDocs(data);
      } catch (err) {
        setError('Failed to fetch documents.');
      }
      setLoading(false);
    };
    fetchDocs();
  }, []);

  return (
    <div className="rounded-2xl shadow-xl bg-white/40 backdrop-blur-md p-6 w-full max-w-2xl mx-auto mt-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Automated Document Organizer</h2>
      <div className="mb-4 text-gray-700">Upload, auto-tag, and easily retrieve your bills, receipts, and statements.</div>
      {loading && <div className="text-blue-600">Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <ul className="space-y-4">
        {docs.map(doc => (
          <li key={doc.id} className="p-4 rounded-xl bg-white/70 shadow flex flex-col md:flex-row md:items-center gap-4 border-l-4 border-blue-400">
            <img src={doc.preview} alt={doc.fileName} className="w-20 h-20 object-cover rounded-lg shadow" />
            <div className="flex-1">
              <div className="font-semibold text-gray-800">{doc.fileName}</div>
              <div className="text-xs text-gray-500">Vendor: {doc.vendor}</div>
              <div className="text-xs text-gray-500">Date: {doc.date}</div>
              {doc.amount > 0 && <div className="text-xs text-gray-500">Amount: ₹{doc.amount}</div>}
            </div>
            <a href={doc.link} target="_blank" rel="noopener noreferrer" className="py-2 px-4 rounded-lg bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition text-xs">
              View / Download
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-6 text-gray-600 text-sm">
        <span>Tip: Preview and download your documents anytime, anywhere!</span>
      </div>
    </div>
  );
};

export default DocumentOrganizerAPI;
