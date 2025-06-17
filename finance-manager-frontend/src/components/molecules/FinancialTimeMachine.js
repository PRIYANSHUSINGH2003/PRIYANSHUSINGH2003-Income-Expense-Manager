import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:4011/api/time-machine';

const FinancialTimeMachine = () => {
  const [snapshots, setSnapshots] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSnapshots = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setSnapshots(data);
        setSelected(data[data.length - 2]); // Default to present
      } catch (err) {
        setError('Failed to fetch time machine data.');
      }
      setLoading(false);
    };
    fetchSnapshots();
  }, []);

  return (
    <div className="rounded-2xl shadow-xl bg-white/40 backdrop-blur-md p-6 w-full max-w-3xl mx-auto mt-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Financial Time Machine</h2>
      <div className="mb-4 text-gray-700">Rewind to your financial past or fast forward to see your projected future!</div>
      {loading && <div className="text-blue-600">Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {snapshots.map(snap => (
          <button
            key={snap.id}
            onClick={() => setSelected(snap)}
            className={`px-4 py-2 rounded-lg font-semibold shadow transition border-2 ${selected && selected.id === snap.id ? 'border-blue-500 bg-blue-100' : 'border-transparent bg-white/60'} text-xs`}
          >
            {snap.type === 'past' && '⏪'}
            {snap.type === 'present' && '⏺️'}
            {snap.type === 'future' && '⏩'}
            {` ${snap.date}`}
          </button>
        ))}
      </div>
      {selected && (
        <div className="flex flex-col md:flex-row gap-6 items-center bg-white/70 rounded-xl p-6 shadow">
          <img src={selected.image} alt={selected.summary} className="w-32 h-32 object-cover rounded-xl shadow" />
          <div className="flex-1">
            <div className="text-lg font-bold text-blue-700 mb-1">Balance: ₹{selected.balance}</div>
            <div className="text-gray-700 mb-2">{selected.summary}</div>
            <a href={selected.link} target="_blank" rel="noopener noreferrer" className="py-2 px-4 rounded-lg bg-green-500 text-white font-semibold shadow hover:bg-green-600 transition text-xs">
              Learn More
            </a>
          </div>
        </div>
      )}
      <div className="mt-8 text-gray-600 text-sm text-center">
        <span>Tip: Use the time machine to reflect on your progress and stay motivated for the future!</span>
      </div>
    </div>
  );
};

export default FinancialTimeMachine;
