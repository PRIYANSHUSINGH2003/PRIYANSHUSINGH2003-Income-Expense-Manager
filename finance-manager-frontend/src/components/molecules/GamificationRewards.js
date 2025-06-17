import React, { useEffect, useState } from 'react';
import Badge from '../Badge';

const API_URL = 'http://localhost:4013/api/gamification';

const GamificationRewards = () => {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRewards = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setRewards(data);
      } catch (err) {
        setError('Failed to fetch rewards.');
      }
      setLoading(false);
    };
    fetchRewards();
  }, []);

  return (
    <div className="rounded-2xl shadow-xl bg-white/40 backdrop-blur-md p-6 w-full max-w-4xl mx-auto mt-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Gamification & Rewards Center</h2>
      <div className="mb-4 text-gray-700">Earn badges and rewards for good financial habits. Stay motivated and celebrate your progress!</div>
      {loading && <div className="text-blue-600">Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {rewards.map(reward => (
          <div key={reward.id} className="rounded-2xl bg-white/70 shadow-xl p-4 flex flex-col items-center text-center hover:scale-105 transition-transform">
            <img src={reward.image} alt={reward.name} className="w-20 h-20 object-contain rounded-xl mb-4 shadow" />
            <div className="text-lg font-semibold text-blue-700 mb-2">{reward.name}</div>
            <div className="text-gray-700 mb-2 text-sm">{reward.description}</div>
            <Badge type="success" className="mb-2">Unlocked</Badge>
            <a href={reward.link} target="_blank" rel="noopener noreferrer" className="py-2 px-4 rounded-lg bg-green-500 text-white font-semibold shadow hover:bg-green-600 transition text-xs mt-2">
              Learn More
            </a>
          </div>
        ))}
      </div>
      <div className="mt-8 text-gray-600 text-sm text-center">
        <span>Tip: Keep building good habits to unlock more rewards!</span>
      </div>
    </div>
  );
};

export default GamificationRewards;
