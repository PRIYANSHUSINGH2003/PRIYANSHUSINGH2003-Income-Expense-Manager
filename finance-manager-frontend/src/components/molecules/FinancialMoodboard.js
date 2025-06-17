import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:4010/api/moodboard';

const FinancialMoodboard = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMoodboard = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setEntries(data);
      } catch (err) {
        setError('Failed to fetch moodboard.');
      }
      setLoading(false);
    };
    fetchMoodboard();
  }, []);

  return (
    <div className="rounded-2xl shadow-xl bg-white/40 backdrop-blur-md p-6 w-full max-w-4xl mx-auto mt-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Financial Moodboard & Inspiration Gallery</h2>
      <div className="mb-4 text-gray-700">Pin your goals, favorite quotes, and get inspired for your financial journey.</div>
      {loading && <div className="text-blue-600">Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {entries.map(entry => (
          <div key={entry.id} className="rounded-2xl bg-white/70 shadow-xl p-4 flex flex-col items-center text-center hover:scale-105 transition-transform">
            <img src={entry.image} alt={entry.quote} className="w-32 h-32 object-cover rounded-xl mb-4 shadow" />
            <div className="text-md font-semibold text-blue-700 mb-2">{entry.quote}</div>
            <a href={entry.link} target="_blank" rel="noopener noreferrer" className="py-2 px-4 rounded-lg bg-green-500 text-white font-semibold shadow hover:bg-green-600 transition text-xs mt-2">
              Learn More
            </a>
          </div>
        ))}
      </div>
      <div className="mt-8 text-gray-600 text-sm text-center">
        <span>Tip: Add your own goals and quotes to stay motivated every day!</span>
      </div>
    </div>
  );
};

export default FinancialMoodboard;
