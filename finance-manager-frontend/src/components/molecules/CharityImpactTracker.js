import React, { useEffect, useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL_CHARITY_DONATIONS || 'http://localhost:4003/api/charity-donations';

const CharityImpactTracker = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDonations = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setDonations(data);
      } catch (err) {
        setError('Failed to fetch donations.');
      }
      setLoading(false);
    };
    fetchDonations();
  }, []);

  const totalDonated = donations.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="rounded-2xl shadow-xl bg-white/40 backdrop-blur-md p-6 w-full max-w-2xl mx-auto mt-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Charity & Impact Tracker</h2>
      <div className="mb-4 text-gray-700">Track your donations, see your impact, and discover new causes to support.</div>
      <div className="mb-4 text-lg font-semibold text-green-700">Total Donated: ₹{totalDonated}</div>
      {loading && <div className="text-blue-600">Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <ul className="space-y-4">
        {donations.map(d => (
          <li key={d.id} className="p-4 rounded-xl bg-white/70 shadow flex flex-col md:flex-row md:items-center gap-4 border-l-4 border-green-400">
            <img src={d.logo} alt={d.charity} className="w-16 h-16 object-contain rounded-lg bg-white shadow" />
            <div className="flex-1">
              <div className="font-semibold text-gray-800">{d.charity}</div>
              <div className="text-xs text-gray-500 mb-1">{d.description}</div>
              <div className="text-xs text-gray-500">Donated: ₹{d.amount} on {d.date}</div>
            </div>
            <a href={d.url} target="_blank" rel="noopener noreferrer" className="py-2 px-4 rounded-lg bg-green-500 text-white font-semibold shadow hover:bg-green-600 transition">
              Learn More
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-between items-center">
        <span className="text-gray-600 text-sm">Tip: Giving back is a great way to make your money matter!</span>
        <a href="https://www.giveindia.org/certified-indian-ngos" target="_blank" rel="noopener noreferrer" className="py-2 px-4 rounded-lg bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition text-sm">Discover New Causes</a>
      </div>
    </div>
  );
};

export default CharityImpactTracker;
