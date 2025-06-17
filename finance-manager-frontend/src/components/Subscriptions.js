import React, { useMemo } from 'react';
import { FaRegCreditCard, FaRegCalendarAlt, FaExternalLinkAlt } from 'react-icons/fa';

// Simple recurring detection: same vendor, similar amount, regular interval
function detectSubscriptions(expenses) {
  if (!Array.isArray(expenses)) return [];
  const map = {};
  expenses.forEach(e => {
    if (!e || typeof e.vendor !== 'string' || typeof e.amount !== 'number') return;
    const key = e.vendor.toLowerCase();
    if (!map[key]) map[key] = [];
    map[key].push(e);
  });
  // Only keep vendors with 3+ charges (likely recurring)
  return Object.entries(map)
    .filter(([_, arr]) => arr.length >= 3)
    .map(([vendor, arr]) => {
      // Sort by date
      arr.sort((a, b) => new Date(a.date) - new Date(b.date));
      // Calculate average interval (days)
      const intervals = arr.slice(1).map((e, i) => (new Date(e.date) - new Date(arr[i].date)) / (1000 * 60 * 60 * 24));
      const avgInterval = intervals.length ? Math.round(intervals.reduce((a, b) => a + b, 0) / intervals.length) : 30;
      // Calculate average amount
      const avgAmount = Math.round(arr.reduce((a, b) => a + b.amount, 0) / arr.length);
      // Next expected charge
      const lastDate = new Date(arr[arr.length - 1].date);
      const nextDate = new Date(lastDate.getTime() + avgInterval * 24 * 60 * 60 * 1000);
      return {
        vendor,
        avgAmount,
        nextDate: nextDate.toLocaleDateString(),
        link: getCancelLink(vendor),
      };
    });
}

// Add more as needed
function getCancelLink(vendor) {
  const links = {
    netflix: 'https://www.netflix.com/CancelPlan',
    gym: '',
    adobe: 'https://account.adobe.com/plans',
    amazon: 'https://www.amazon.in/gp/css/homepage.html',
    spotify: 'https://www.spotify.com/account/subscription/',
    // ...
  };
  const key = vendor.toLowerCase();
  return links[key] || `https://www.google.com/search?q=cancel+${encodeURIComponent(vendor)}+subscription`;
}

export default function Subscriptions({ expenses }) {
  const subs = useMemo(() => detectSubscriptions(expenses), [expenses]);
  if (!subs.length) return (
    <div className="bg-glass dark:bg-glassDark rounded-2xl p-6 shadow-lg text-center">
      <FaRegCreditCard className="mx-auto text-3xl text-primary mb-2" />
      <div className="font-bold text-lg mb-2">No recurring subscriptions detected</div>
      <div className="text-gray-500">Add more expense data to see your subscriptions here.</div>
    </div>
  );
  return (
    <div className="bg-glass dark:bg-glassDark rounded-2xl p-6 shadow-lg">
      <div className="font-bold text-xl mb-4 flex items-center gap-2 text-primary dark:text-white">
        <FaRegCreditCard className="text-2xl" /> Subscriptions & Bills
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {subs.map((sub, i) => (
          <div key={i} className="flex items-center gap-4 py-4">
            <div className="flex-1">
              <div className="font-semibold text-lg flex items-center gap-2">
                <span role="img" aria-label="subscription">💳</span> {sub.vendor.charAt(0).toUpperCase() + sub.vendor.slice(1)}
              </div>
              <div className="text-gray-500 text-sm flex items-center gap-2">
                <FaRegCalendarAlt /> Next: {sub.nextDate}
              </div>
            </div>
            <div className="text-primary dark:text-accent font-bold text-lg min-w-[80px] text-right">₹{sub.avgAmount}/mo</div>
            <a
              href={sub.link}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-3 py-1 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary dark:text-white font-semibold flex items-center gap-1 hover:bg-primary/20 dark:hover:bg-primary/30 transition"
            >
              Cancel/Manage <FaExternalLinkAlt className="inline-block text-xs" />
            </a>
          </div>
        ))}
      </div>
      <div className="mt-6 text-sm text-gray-500 dark:text-gray-400 text-center">
        💡 Tip: Review your subscriptions monthly to save money!
      </div>
    </div>
  );
}
