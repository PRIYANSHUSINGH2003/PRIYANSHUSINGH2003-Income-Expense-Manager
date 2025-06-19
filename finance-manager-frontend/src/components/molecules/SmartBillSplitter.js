import React, { useEffect, useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL_BILL_SPLITS || 'http://localhost:4005/api/bill-splits';

const SmartBillSplitter = () => {
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
        setError('Failed to fetch bill splits.');
      }
      setLoading(false);
    };
    fetchBills();
  }, []);

  return (
    <div className="rounded-2xl shadow-xl bg-white/40 backdrop-blur-md p-6 w-full max-w-2xl mx-auto mt-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Smart Bill Splitter</h2>
      <div className="mb-4 text-gray-700">Split bills with friends, track balances, and settle up easily.</div>
      {loading && <div className="text-blue-600">Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <ul className="space-y-6">
        {bills.map(bill => (
          <li key={bill.id} className="p-4 rounded-xl bg-white/70 shadow border-l-4 border-blue-400">
            <div className="mb-2 flex items-center gap-4">
              <div className="text-lg font-semibold text-gray-800 flex-1">{bill.billName}</div>
              <div className="text-sm text-gray-600">Total: ₹{bill.total}</div>
            </div>
            <div className="flex flex-col gap-3">
              {bill.friends.map(friend => (
                <div key={friend.name} className="flex items-center gap-4 p-2 rounded-lg bg-white/60 shadow border-l-4 {friend.settled ? 'border-green-400' : 'border-yellow-400'}">
                  <img src={friend.avatar} alt={friend.name} className="w-10 h-10 object-cover rounded-full border-2 border-blue-300" />
                  <div className="flex-1">
                    <a href={friend.profile} target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-800 hover:underline">{friend.name}</a>
                    <div className="text-xs text-gray-500">Owes: ₹{friend.owed}</div>
                  </div>
                  {friend.settled ? (
                    <span className="text-green-600 font-semibold">Settled</span>
                  ) : (
                    <a href={friend.payment} className="py-2 px-4 rounded-lg bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition text-xs" target="_blank" rel="noopener noreferrer">
                      Settle Up
                    </a>
                  )}
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 text-gray-600 text-sm">
        <span>Tip: Click on a friend’s name to chat, or use “Settle Up” to pay instantly!</span>
      </div>
    </div>
  );
};

export default SmartBillSplitter;
