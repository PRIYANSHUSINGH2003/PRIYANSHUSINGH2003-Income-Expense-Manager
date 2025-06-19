import React, { useEffect, useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL_SHARED_WALLETS || 'http://localhost:4012/api/shared-wallets';

const SharedWallets = () => {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWallets = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setWallets(data);
      } catch (err) {
        setError('Failed to fetch shared wallets.');
      }
      setLoading(false);
    };
    fetchWallets();
  }, []);

  return (
    <div className="rounded-2xl shadow-xl bg-white/40 backdrop-blur-md p-6 w-full max-w-3xl mx-auto mt-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Family & Shared Wallets</h2>
      <div className="mb-4 text-gray-700">Manage shared finances with family or friends. Invite, track, and collaborate easily.</div>
      {loading && <div className="text-blue-600">Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <ul className="space-y-6">
        {wallets.map(wallet => (
          <li key={wallet.id} className="p-4 rounded-xl bg-white/70 shadow border-l-4 border-green-400">
            <div className="mb-2 flex items-center gap-4">
              <div className="text-lg font-semibold text-gray-800 flex-1">{wallet.walletName}</div>
              <div className="text-sm text-gray-600">Balance: ₹{wallet.balance}</div>
              <a href={wallet.invite} target="_blank" rel="noopener noreferrer" className="py-2 px-4 rounded-lg bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition text-xs">Invite</a>
            </div>
            <div className="flex flex-wrap gap-4 mt-2">
              {wallet.members.map(member => (
                <div key={member.name} className="flex items-center gap-2 bg-white/60 rounded-lg px-3 py-2 shadow border-l-4 border-blue-400">
                  <img src={member.avatar} alt={member.name} className="w-8 h-8 object-cover rounded-full border-2 border-blue-300" />
                  <div className="flex flex-col">
                    <a href={member.profile} target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-800 hover:underline text-xs">{member.name}</a>
                    <span className="text-[10px] text-gray-500">{member.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 text-gray-600 text-sm">
        <span>Tip: Use shared wallets for family budgets, roommate expenses, or group trips!</span>
      </div>
    </div>
  );
};

export default SharedWallets;
