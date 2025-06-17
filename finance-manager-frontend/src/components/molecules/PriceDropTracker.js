import React from 'react';

// Dummy data for demonstration
const dummyPurchases = [
  {
    id: 1,
    item: 'Wireless Headphones',
    purchaseDate: '2024-05-15',
    purchasePrice: 3500,
    currentPrice: 2999,
    priceDropDetected: true,
  },
  {
    id: 2,
    item: 'Fitness Tracker',
    purchaseDate: '2024-05-20',
    purchasePrice: 4200,
    currentPrice: 4200,
    priceDropDetected: false,
  },
  {
    id: 3,
    item: 'Bluetooth Speaker',
    purchaseDate: '2024-06-01',
    purchasePrice: 2100,
    currentPrice: 1800,
    priceDropDetected: true,
  },
];

const PriceDropTracker = ({ purchases = dummyPurchases }) => {
  return (
    <div className="rounded-2xl shadow-xl bg-white/40 backdrop-blur-md p-6 w-full max-w-2xl mx-auto mt-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Price Drop Refund Tracker</h2>
      <div className="mb-4 text-gray-700">We monitor your purchases for price drops and help you claim refunds where possible.</div>
      <ul className="space-y-4">
        {purchases.map(p => (
          <li key={p.id} className={`p-4 rounded-xl bg-white/70 shadow flex flex-col md:flex-row md:items-center gap-2 border-l-4 ${p.priceDropDetected ? 'border-green-400' : 'border-gray-300'}`}> 
            <div className="flex-1">
              <div className="font-semibold text-gray-800">{p.item}</div>
              <div className="text-xs text-gray-500">Purchased: {p.purchaseDate}</div>
              <div className="text-xs text-gray-500">Paid: ₹{p.purchasePrice}</div>
              <div className="text-xs text-gray-500">Current Price: ₹{p.currentPrice}</div>
              {p.priceDropDetected && (
                <div className="text-green-600 font-medium mt-1">
                  Price dropped by ₹{p.purchasePrice - p.currentPrice}!
                </div>
              )}
            </div>
            {p.priceDropDetected ? (
              <button className="py-2 px-4 rounded-lg bg-green-500 text-white font-semibold shadow hover:bg-green-600 transition">
                Claim Refund
              </button>
            ) : (
              <span className="text-gray-400 text-xs">No price drop</span>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-4 text-gray-600 text-sm">
        <span>Tip: For eligible purchases, you can often claim a refund or price adjustment from the retailer.</span>
      </div>
    </div>
  );
};

export default PriceDropTracker;
