import React, { useState } from 'react';

// Dummy data for demonstration
const dummyAlerts = [
  {
    id: 1,
    description: 'Alert me if I spend more than ₹2,000 on coffee in a month',
    active: true,
    triggered: false,
    lastChecked: '2024-06-07',
  },
  {
    id: 2,
    description: 'Notify me if my balance drops below ₹5,000',
    active: true,
    triggered: true,
    lastChecked: '2024-06-06',
  },
];

const CustomAlerts = () => {
  const [alerts, setAlerts] = useState(dummyAlerts);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [frequency, setFrequency] = useState('month');
  const [type, setType] = useState('spend');
  const [success, setSuccess] = useState(false);

  const handleAddAlert = (e) => {
    e.preventDefault();
    if (!category || !amount) return;
    let desc = '';
    if (type === 'spend') {
      desc = `Alert me if I spend more than ₹${amount} on ${category} in a ${frequency}`;
    } else {
      desc = `Notify me if my balance drops below ₹${amount}`;
    }
    setAlerts([
      {
        id: Date.now(),
        description: desc,
        active: true,
        triggered: false,
        lastChecked: new Date().toISOString().slice(0, 10),
      },
      ...alerts,
    ]);
    setCategory('');
    setAmount('');
    setFrequency('month');
    setType('spend');
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div className="rounded-2xl shadow-xl bg-white/40 backdrop-blur-md p-6 w-full max-w-2xl mx-auto mt-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Custom Alerts & Triggers</h2>
      <form onSubmit={handleAddAlert} className="mb-6 flex flex-col gap-2">
        <div className="flex gap-2">
          <select
            className="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 bg-white/70"
            value={type}
            onChange={e => setType(e.target.value)}
          >
            <option value="spend">Spending Alert</option>
            <option value="balance">Balance Alert</option>
          </select>
          {type === 'spend' && (
            <>
              <input
                type="text"
                className="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 bg-white/70"
                placeholder="Category (e.g. coffee)"
                value={category}
                onChange={e => setCategory(e.target.value)}
              />
              <input
                type="number"
                className="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 bg-white/70"
                placeholder="Amount (₹)"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                min={1}
              />
              <select
                className="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 bg-white/70"
                value={frequency}
                onChange={e => setFrequency(e.target.value)}
              >
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
              </select>
            </>
          )}
          {type === 'balance' && (
            <input
              type="number"
              className="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 bg-white/70"
              placeholder="Balance (₹)"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              min={1}
            />
          )}
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 rounded-lg bg-blue-500 text-white font-semibold shadow-md hover:bg-blue-600 transition"
        >
          Add Alert
        </button>
        {success && <div className="text-green-600 mt-2">Alert created!</div>}
      </form>
      <div>
        <h3 className="text-lg font-semibold mb-2">Active Alerts</h3>
        <ul className="space-y-3">
          {alerts.map(alert => (
            <li key={alert.id} className={`p-4 rounded-xl bg-white/70 shadow flex flex-col md:flex-row md:items-center gap-2 border-l-4 ${alert.triggered ? 'border-red-400' : 'border-blue-400'}`}>
              <div className="flex-1">
                <div className="text-gray-700">{alert.description}</div>
                <div className="text-xs text-gray-500">Last checked: {alert.lastChecked}</div>
                {alert.triggered && <div className="text-red-600 text-xs font-semibold">Triggered!</div>}
              </div>
              <button className="py-2 px-4 rounded-lg bg-gray-200 text-gray-700 font-semibold shadow hover:bg-gray-300 transition">
                {alert.active ? 'Active' : 'Inactive'}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 text-gray-600 text-sm">
        <span>Tip: Set up custom alerts to stay on top of your finances and avoid surprises!</span>
      </div>
    </div>
  );
};

export default CustomAlerts;
