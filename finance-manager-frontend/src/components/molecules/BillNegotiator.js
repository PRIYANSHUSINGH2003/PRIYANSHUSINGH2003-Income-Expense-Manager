import React, { useEffect, useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL_BILL_NEGOTIATOR || 'http://localhost:4014/api/bill-negotiator';

const BillNegotiator = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBills = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setBills(data);
      } catch (err) {
        setError('Failed to fetch bills.');
      }
      setLoading(false);
    };
    fetchBills();
  }, []);

  return (
    <div className="rounded-2xl shadow-xl bg-white/40 backdrop-blur-md p-6 w-full max-w-2xl mx-auto mt-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Automated Bill Negotiator</h2>
      <div className="mb-4 text-gray-700">Detect high recurring bills and get tips to negotiate better rates.</div>
      {loading && <div className="text-blue-600">Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <ul className="space-y-4">
        {bills.map(bill => (
          <li key={bill.id} className="p-4 rounded-xl bg-white/70 shadow flex flex-col md:flex-row md:items-center gap-4 border-l-4 border-blue-400">
            <img src={bill.logo} alt={bill.provider} className="w-16 h-16 object-contain rounded-lg bg-white shadow" />
            <div className="flex-1">
              <div className="font-semibold text-gray-800">{bill.provider} <span className="text-xs text-gray-500">({bill.type})</span></div>
              <div className="text-xs text-gray-500">Amount: ₹{bill.amount}</div>
              <div className="text-xs text-blue-700 font-medium mt-1">{bill.suggestion}</div>
            </div>
            <a href={bill.contact} target="_blank" rel="noopener noreferrer" className="py-2 px-4 rounded-lg bg-green-500 text-white font-semibold shadow hover:bg-green-600 transition text-xs">
              Negotiate Now
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-6 text-gray-600 text-sm">
        <span>Tip: Contact your provider and mention loyalty or new customer offers for better rates!</span>
      </div>
    </div>
  );
};

export default BillNegotiator;
