import React, { useEffect, useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL_ECO_SPENDING || 'http://localhost:4006/api/eco-spending';

const EcoSpendingAnalyzer = () => {
  const [ecoData, setEcoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEco = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setEcoData(data);
      } catch (err) {
        setError('Failed to fetch eco-spending data.');
      }
      setLoading(false);
    };
    fetchEco();
  }, []);

  return (
    <div className="rounded-2xl shadow-xl bg-white/40 backdrop-blur-md p-6 w-full max-w-2xl mx-auto mt-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Eco-Spending Analyzer</h2>
      <div className="mb-4 text-gray-700">See your environmental impact and discover greener choices.</div>
      {loading && <div className="text-blue-600">Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      {ecoData && (
        <>
          <div className="mb-4 flex items-center gap-4">
            <div className="text-lg font-semibold text-green-700">{ecoData.summary.greenPercent}% Green Purchases</div>
            <div className="text-sm text-gray-600">({ecoData.summary.greenPurchases} of {ecoData.summary.totalPurchases})</div>
          </div>
          <ul className="space-y-3">
            {ecoData.purchases.map(p => (
              <li key={p.id} className={`p-4 rounded-xl bg-white/70 shadow flex flex-col md:flex-row md:items-center gap-4 border-l-4 ${p.green ? 'border-green-400' : 'border-red-400'}`}>
                <img src={p.logo} alt={p.brand} className="w-14 h-14 object-contain rounded-lg bg-white shadow" />
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">{p.item} <span className="text-xs text-gray-500">({p.brand})</span></div>
                  <div className="text-xs text-gray-500">Amount: ₹{p.amount}</div>
                  <div className="text-xs text-gray-500">Eco Score: <span className={p.green ? 'text-green-600' : 'text-red-600'}>{p.ecoScore}</span></div>
                </div>
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="py-2 px-4 rounded-lg bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition text-xs">
                  Learn More
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
      <div className="mt-6 text-gray-600 text-sm">
        <span>Tip: Choose brands with higher eco-scores to reduce your environmental impact!</span>
      </div>
    </div>
  );
};

export default EcoSpendingAnalyzer;
