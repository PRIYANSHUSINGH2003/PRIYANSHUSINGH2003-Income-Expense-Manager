import React, { useState } from 'react';

const API_URL = 'http://localhost:4001/api/product-info';

const dummyWishlist = [
  {
    id: 1,
    name: 'Noise Cancelling Headphones',
    targetPrice: 3000,
    currentPrice: 2799,
    url: 'https://example.com/headphones',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    priceDropped: true,
  },
  {
    id: 2,
    name: 'Standing Desk',
    targetPrice: 12000,
    currentPrice: 13500,
    url: 'https://example.com/desk',
    imageUrl: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
    priceDropped: false,
  },
];

const FinancialWishlist = () => {
  const [wishlist, setWishlist] = useState(dummyWishlist);
  const [name, setName] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const [url, setUrl] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddItem = async (e) => {
    e.preventDefault();
    if ((!name && !url) || !targetPrice) return;
    setLoading(true);
    setError('');
    let productData = { name, currentPrice: Number(targetPrice), imageUrl: '', url };
    if (url) {
      try {
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url }),
        });
        const data = await res.json();
        productData = { ...productData, ...data, url };
      } catch (err) {
        setError('Failed to fetch product info.');
      }
    }
    const priceDropped = productData.currentPrice < Number(targetPrice);
    setWishlist([
      {
        id: Date.now(),
        name: productData.name,
        targetPrice: Number(targetPrice),
        currentPrice: productData.currentPrice,
        url: productData.url,
        imageUrl: productData.imageUrl,
        priceDropped,
      },
      ...wishlist,
    ]);
    setName('');
    setTargetPrice('');
    setUrl('');
    setSuccess(true);
    setLoading(false);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div className="rounded-2xl shadow-xl bg-white/40 backdrop-blur-md p-6 w-full max-w-2xl mx-auto mt-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Financial Wishlist & Price Tracker</h2>
      <form onSubmit={handleAddItem} className="mb-6 flex flex-col gap-2">
        <input
          type="text"
          className="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 bg-white/70"
          placeholder="Item name (e.g. Laptop)"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="number"
          className="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 bg-white/70"
          placeholder="Target price (₹)"
          value={targetPrice}
          onChange={e => setTargetPrice(e.target.value)}
          min={1}
        />
        <input
          type="url"
          className="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 bg-white/70"
          placeholder="Product link (optional)"
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
        <button
          type="submit"
          className="w-full py-2 px-4 rounded-lg bg-blue-500 text-white font-semibold shadow-md hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add to Wishlist'}
        </button>
        {success && <div className="text-green-600 mt-2">Item added!</div>}
        {error && <div className="text-red-600 mt-2">{error}</div>}
      </form>
      <div>
        <h3 className="text-lg font-semibold mb-2">Your Wishlist</h3>
        <ul className="space-y-3">
          {wishlist.map(item => (
            <li key={item.id} className={`p-4 rounded-xl bg-white/70 shadow flex flex-col md:flex-row md:items-center gap-4 border-l-4 ${item.priceDropped ? 'border-green-400' : 'border-blue-400'}`}>
              {item.imageUrl && (
                <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-lg shadow" />
              )}
              <div className="flex-1">
                <div className="font-semibold text-gray-800">{item.name}</div>
                <div className="text-xs text-gray-500">Target: ₹{item.targetPrice}</div>
                <div className="text-xs text-gray-500">Current: ₹{item.currentPrice}</div>
                {item.url && (
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 underline">View Product</a>
                )}
                {item.priceDropped && (
                  <div className="text-green-600 font-medium mt-1">Price dropped! Now ₹{item.currentPrice}</div>
                )}
              </div>
              <button className="py-2 px-4 rounded-lg bg-gray-200 text-gray-700 font-semibold shadow hover:bg-gray-300 transition">
                {item.priceDropped ? 'Buy Now' : 'Track' }
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 text-gray-600 text-sm">
        <span>Tip: Add items to your wishlist and get notified when prices drop or your budget allows!</span>
      </div>
    </div>
  );
};

export default FinancialWishlist;
