import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:4007/api/tax-estimate';

const TaxEstimator = () => {
  const [taxData, setTaxData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTax = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setTaxData(data);
      } catch (err) {
        setError('Failed to fetch tax estimate.');
      }
      setLoading(false);
    };
    fetchTax();
  }, []);

  const getTaxPercent = () => {
    if (!taxData) return 0;
    return Math.round((taxData.estimatedTax / taxData.taxable) * 100);
  };

  return (
    <div className="rounded-2xl shadow-xl bg-white/40 backdrop-blur-md p-6 w-full max-w-2xl mx-auto mt-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Automated Tax Estimator</h2>
      <div className="mb-4 text-gray-700">Estimate your tax liability and get actionable tips to save more.</div>
      {loading && <div className="text-blue-600">Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      {taxData && (
        <>
          <div className="mb-4 flex flex-col gap-2">
            <div className="flex gap-6 text-sm text-gray-700">
              <span>Income: <span className="font-semibold">₹{taxData.income}</span></span>
              <span>Deductions: <span className="font-semibold">₹{taxData.deductions}</span></span>
              <span>Taxable: <span className="font-semibold">₹{taxData.taxable}</span></span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
              <div
                className="h-4 rounded-full bg-blue-500"
                style={{ width: `${getTaxPercent()}%` }}
              ></div>
            </div>
            <div className="text-lg font-bold text-blue-700 mt-2">Estimated Tax: ₹{taxData.estimatedTax}</div>
          </div>
          <div className="mb-2 text-lg font-semibold text-blue-700">How to Save More</div>
          <ul className="space-y-3">
            {taxData.tips.map((tip, idx) => (
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
        <span>Tip: Use these strategies to reduce your tax and keep more of your money!</span>
      </div>
    </div>
  );
};

export default TaxEstimator;
