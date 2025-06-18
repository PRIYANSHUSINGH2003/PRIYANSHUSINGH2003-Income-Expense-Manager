import React, { useEffect, useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL_HEALTH_SCORE || 'http://localhost:4004/api/health-score';

const getScoreColor = (score) => {
  if (score >= 80) return 'bg-green-400';
  if (score >= 60) return 'bg-yellow-400';
  return 'bg-red-400';
};

const FinancialHealthScore = () => {
  const [scoreData, setScoreData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchScore = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setScoreData(data);
      } catch (err) {
        setError('Failed to fetch health score.');
      }
      setLoading(false);
    };
    fetchScore();
  }, []);

  return (
    <div className="rounded-2xl shadow-xl bg-white/40 backdrop-blur-md p-6 w-full max-w-2xl mx-auto mt-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Financial Health Score</h2>
      <div className="mb-4 text-gray-700">See your overall financial health and get personalized tips to improve it.</div>
      {loading && <div className="text-blue-600">Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      {scoreData && (
        <>
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-lg ${getScoreColor(scoreData.score)}`}>{scoreData.score}</div>
            <div className="flex-1">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className={`h-4 rounded-full ${getScoreColor(scoreData.score)}`}
                  style={{ width: `${scoreData.score}%` }}
                ></div>
              </div>
              <div className="flex gap-4 mt-2 text-xs text-gray-600">
                <span>Spending: {scoreData.breakdown.spending}</span>
                <span>Saving: {scoreData.breakdown.saving}</span>
                <span>Debt: {scoreData.breakdown.debt}</span>
                <span>Investment: {scoreData.breakdown.investment}</span>
              </div>
            </div>
          </div>
          <div className="mb-2 text-lg font-semibold text-blue-700">Personalized Roadmap</div>
          <ul className="space-y-3">
            {scoreData.tips.map((tip, idx) => (
              <li key={idx} className="flex items-center gap-4 p-3 rounded-xl bg-white/70 shadow border-l-4 border-blue-400">
                <img src={tip.icon} alt={tip.title} className="w-10 h-10 object-contain rounded-lg bg-white" />
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">{tip.title}</div>
                  <div className="text-xs text-gray-500 mb-1">{tip.description}</div>
                  <a href={tip.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 underline">Learn More</a>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
      <div className="mt-6 text-gray-600 text-sm">
        <span>Tip: Improving your financial health score can help you achieve your goals faster!</span>
      </div>
    </div>
  );
};

export default FinancialHealthScore;
