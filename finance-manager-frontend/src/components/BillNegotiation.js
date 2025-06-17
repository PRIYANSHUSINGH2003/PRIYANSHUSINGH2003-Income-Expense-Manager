import React, { useState } from 'react';
import { FaRegMoneyBillAlt, FaRegLightbulb, FaExternalLinkAlt } from 'react-icons/fa';

// Example static market averages (in a real app, fetch from API or keep updated dataset)
const marketAverages = {
  'airtel broadband': 799,
  'netflix': 499,
  'gym': 1000,
  'adobe': 1200,
  'amazon prime': 299,
  'spotify': 199,
};

function getMarketAvg(vendor) {
  return marketAverages[vendor.toLowerCase()] || null;
}

function getComparisonLink(vendor) {
  // Add more as needed
  const links = {
    'airtel broadband': 'https://www.jio.com/fiber',
    'netflix': 'https://www.hotstar.com/in',
    'adobe': 'https://www.canva.com/pricing/',
    'amazon prime': 'https://www.netflix.com/in/',
    'spotify': 'https://www.gaana.com/',
  };
  return links[vendor.toLowerCase()] || `https://www.google.com/search?q=cheaper+alternatives+to+${encodeURIComponent(vendor)}`;
}

const negotiationTemplate = (vendor) => `Subject: Request for Better Plan or Discount\n\nHi ${vendor.charAt(0).toUpperCase() + vendor.slice(1)},\n\nI’ve noticed my current plan is above the market average. Are there any discounts or better plans available for loyal customers?\n\nThank you!`;

export default function BillNegotiation({ subscriptions }) {
  const [showModal, setShowModal] = useState(false);
  const [modalVendor, setModalVendor] = useState('');
  const handleNegotiate = (vendor) => {
    setModalVendor(vendor);
    setShowModal(true);
  };
  if (!subscriptions || !subscriptions.length) return null;
  return (
    <div className="bg-glass dark:bg-glassDark rounded-2xl p-6 shadow-lg mt-8">
      <div className="font-bold text-xl mb-4 flex items-center gap-2 text-primary dark:text-white">
        <FaRegMoneyBillAlt className="text-2xl" /> Bill Negotiation & Savings
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {subscriptions.map((sub, i) => {
          const marketAvg = getMarketAvg(sub.vendor);
          const savings = marketAvg && sub.avgAmount > marketAvg ? sub.avgAmount - marketAvg : 0;
          return (
            <div key={i} className="flex items-center gap-4 py-4">
              <div className="flex-1">
                <div className="font-semibold text-lg flex items-center gap-2">
                  <span role="img" aria-label="subscription">💡</span> {sub.vendor.charAt(0).toUpperCase() + sub.vendor.slice(1)}
                </div>
                <div className="text-gray-500 text-sm flex items-center gap-2">
                  Your Plan: ₹{sub.avgAmount}/mo
                  {marketAvg && <span className="ml-2">Market Avg: <span className="font-bold text-primary dark:text-accent">₹{marketAvg}/mo</span></span>}
                </div>
                {savings > 0 && (
                  <div className="text-green-600 dark:text-green-400 text-sm mt-1 flex items-center gap-1">
                    <FaRegLightbulb /> You could save <span className="font-bold">₹{savings}/mo</span> by switching or negotiating!
                  </div>
                )}
              </div>
              <a
                href={getComparisonLink(sub.vendor)}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 px-3 py-1 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary dark:text-white font-semibold flex items-center gap-1 hover:bg-primary/20 dark:hover:bg-primary/30 transition"
              >
                See Cheaper Options <FaExternalLinkAlt className="inline-block text-xs" />
              </a>
              <button
                className="ml-2 px-3 py-1 rounded-lg bg-accent/10 dark:bg-accent/20 text-accent dark:text-white font-semibold flex items-center gap-1 hover:bg-accent/20 dark:hover:bg-accent/30 transition"
                onClick={() => handleNegotiate(sub.vendor)}
              >
                Negotiate
              </button>
            </div>
          );
        })}
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl max-w-md w-full text-left">
            <h2 className="text-xl font-bold mb-4">Negotiation Template</h2>
            <textarea
              className="w-full h-40 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 font-mono mb-4"
              value={negotiationTemplate(modalVendor)}
              readOnly
            />
            <div className="flex justify-end gap-2">
              <button className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold" onClick={() => setShowModal(false)}>Close</button>
              <button className="px-4 py-2 rounded-lg bg-primary text-white font-bold" onClick={() => {navigator.clipboard.writeText(negotiationTemplate(modalVendor)); setShowModal(false);}}>Copy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
