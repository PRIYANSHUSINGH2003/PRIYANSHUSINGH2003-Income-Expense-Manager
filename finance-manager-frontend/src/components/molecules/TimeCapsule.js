import React, { useState } from 'react';

// Dummy data for demonstration
const dummyCapsules = [
  {
    id: 1,
    message: 'I want to save ₹50,000 for my Europe trip!',
    targetDate: '2024-12-01',
    createdAt: '2024-06-01',
    delivered: false,
  },
  {
    id: 2,
    message: 'Congrats on paying off your credit card debt! 🎉',
    targetDate: '2024-07-01',
    createdAt: '2024-01-01',
    delivered: true,
    deliveredAt: '2024-07-01',
  },
];

const TimeCapsule = () => {
  const [capsules, setCapsules] = useState(dummyCapsules);
  const [message, setMessage] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message || !targetDate) return;
    const newCapsule = {
      id: Date.now(),
      message,
      targetDate,
      createdAt: new Date().toISOString().slice(0, 10),
      delivered: false,
    };
    setCapsules([newCapsule, ...capsules]);
    setMessage('');
    setTargetDate('');
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div className="rounded-2xl shadow-xl bg-white/40 backdrop-blur-md p-6 w-full max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Financial Time Capsule</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 mb-3 bg-white/70"
          rows={3}
          placeholder="Write a message or goal to your future self..."
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <input
          type="date"
          className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 mb-3 bg-white/70"
          value={targetDate}
          onChange={e => setTargetDate(e.target.value)}
          min={new Date().toISOString().slice(0, 10)}
        />
        <button
          type="submit"
          className="w-full py-2 px-4 rounded-lg bg-blue-500 text-white font-semibold shadow-md hover:bg-blue-600 transition"
        >
          Create Time Capsule
        </button>
        {success && <div className="text-green-600 mt-2">Time capsule created!</div>}
      </form>
      <div>
        <h3 className="text-lg font-semibold mb-2">Your Time Capsules</h3>
        <ul className="space-y-3">
          {capsules.map(capsule => (
            <li key={capsule.id} className={`p-4 rounded-xl bg-white/60 shadow flex flex-col gap-1 ${capsule.delivered ? 'border-l-4 border-green-400' : 'border-l-4 border-blue-400'}`}>
              <div className="text-gray-700">{capsule.message}</div>
              <div className="text-xs text-gray-500">To be delivered: <span className="font-medium">{capsule.targetDate}</span></div>
              <div className="text-xs text-gray-400">Created: {capsule.createdAt}</div>
              {capsule.delivered && <div className="text-green-600 text-xs font-semibold">Delivered on {capsule.deliveredAt}</div>}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 text-gray-600 text-sm">
        <span>Tip: Your message will be delivered to you on the selected date. Stay motivated!</span>
      </div>
    </div>
  );
};

export default TimeCapsule;
