import React, { useEffect, useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL_ANOMALY_DETECTOR || 'http://localhost:4015/api/anomaly-detector';

const AnomalyDetector = () => {
  const [anomalies, setAnomalies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnomalies = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setAnomalies(data);
      } catch (err) {
        setError('Failed to fetch anomalies.');
      }
      setLoading(false);
    };
    fetchAnomalies();
  }, []);

  return (
    <div className="rounded-2xl shadow-xl bg-white/40 backdrop-blur-md p-6 w-full max-w-2xl mx-auto mt-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Anomaly Detector</h2>
      <div className="mb-4 text-gray-700">Detect suspicious spikes or unusual activity in your expenses and investigate instantly.</div>
      {loading && <div className="text-blue-600">Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <ul className="space-y-4">
        {anomalies.map(anomaly => (
          <li key={anomaly.id} className="p-4 rounded-xl bg-white/70 shadow flex flex-col md:flex-row md:items-center gap-4 border-l-4 border-red-400">
            <img src={anomaly.alert} alt="alert" className="w-12 h-12 object-contain rounded-lg bg-white shadow" />
            <div className="flex-1">
              <div className="font-semibold text-gray-800">{anomaly.category} <span className="text-xs text-gray-500">({anomaly.date})</span></div>
              <div className="text-xs text-gray-500">Amount: ₹{anomaly.amount}</div>
              <div className="text-xs text-red-700 font-medium mt-1">{anomaly.description}</div>
            </div>
            <a href={anomaly.link} target="_blank" rel="noopener noreferrer" className="py-2 px-4 rounded-lg bg-red-500 text-white font-semibold shadow hover:bg-red-600 transition text-xs">
              Investigate
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-6 text-gray-600 text-sm">
        <span>Tip: Review flagged transactions promptly to avoid fraud or errors!</span>
      </div>
    </div>
  );
};

export default AnomalyDetector;
