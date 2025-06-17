import React, { useMemo } from 'react';
import { FaUndoAlt, FaRegClock, FaRegCheckCircle } from 'react-icons/fa';

// Example: detect refunds from expense descriptions
function detectRefunds(expenses) {
  if (!Array.isArray(expenses)) return [];
  // Look for keywords in description or category
  const refundKeywords = ['refund', 'reversal', 'returned', 'failed', 'cancel', 'chargeback'];
  return expenses
    .filter(e =>
      e &&
      typeof e === 'object' &&
      typeof e.category === 'string' &&
      typeof e.amount === 'number' &&
      (refundKeywords.some(k => (e.description || '').toLowerCase().includes(k)) ||
        refundKeywords.some(k => e.category.toLowerCase().includes(k)))
    )
    .map(e => ({
      ...e,
      status: e.status || (e.date && new Date(e.date) > Date.now() ? 'pending' : 'completed'),
    }));
}

export default function RefundTracker({ expenses }) {
  const refunds = useMemo(() => detectRefunds(expenses), [expenses]);
  if (!refunds.length) return (
    <div className="bg-glass dark:bg-glassDark rounded-2xl p-6 shadow-lg text-center mt-8">
      <FaUndoAlt className="mx-auto text-3xl text-primary mb-2" />
      <div className="font-bold text-lg mb-2">No pending or recent refunds detected</div>
      <div className="text-gray-500">Refunds for canceled/returned purchases will appear here.</div>
    </div>
  );
  return (
    <div className="bg-glass dark:bg-glassDark rounded-2xl p-6 shadow-lg mt-8">
      <div className="font-bold text-xl mb-4 flex items-center gap-2 text-primary dark:text-white">
        <FaUndoAlt className="text-2xl" /> Refund & Cashback Tracker
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {refunds.map((r, i) => (
          <div key={i} className="flex items-center gap-4 py-4">
            <div className="flex-1">
              <div className="font-semibold text-lg flex items-center gap-2">
                <span role="img" aria-label="refund">💸</span> {r.category}
              </div>
              <div className="text-gray-500 text-sm flex items-center gap-2">
                {r.description || 'No description'}
              </div>
            </div>
            <div className="text-primary dark:text-accent font-bold text-lg min-w-[80px] text-right">₹{r.amount}</div>
            <div className="flex items-center gap-2 min-w-[120px] text-sm">
              {r.status === 'pending' ? (
                <><FaRegClock className="text-yellow-500" /> Pending</>
              ) : (
                <><FaRegCheckCircle className="text-green-500" /> Completed</>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-sm text-gray-500 dark:text-gray-400 text-center">
        💡 Tip: Track your refunds and follow up with merchants if delayed!
      </div>
    </div>
  );
}
