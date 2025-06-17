import React from 'react';

// Dummy data for demonstration
const dummyStory = {
  month: 'June 2024',
  summary: 'You spent 20% less on dining out this month! Great job staying on track with your goals. Your biggest saving was in Groceries, and you had an unusual spike in Transport expenses.',
  highlights: [
    { label: 'Biggest Saving', value: 'Groceries' },
    { label: 'Unusual Spike', value: 'Transport' },
    { label: 'Total Saved', value: '₹4,200' },
  ],
  chartData: [
    { category: 'Groceries', amount: 3200 },
    { category: 'Dining Out', amount: 1800 },
    { category: 'Transport', amount: 2500 },
    { category: 'Entertainment', amount: 900 },
    { category: 'Utilities', amount: 1200 },
  ],
};

const BarChart = ({ data }) => {
  const max = Math.max(...data.map(d => d.amount));
  return (
    <div className="flex items-end gap-3 h-32 w-full mt-4">
      {data.map(d => (
        <div key={d.category} className="flex flex-col items-center w-16">
          <div
            className="rounded-t-lg bg-blue-400 shadow-md transition-all duration-300"
            style={{ height: `${(d.amount / max) * 100}%`, minHeight: '12px', width: '100%' }}
            title={`₹${d.amount}`}
          ></div>
          <span className="text-xs mt-1 text-gray-700 text-center">{d.category}</span>
        </div>
      ))}
    </div>
  );
};

const FinancialStory = ({ story = dummyStory }) => {
  return (
    <div className="rounded-2xl shadow-xl bg-white/40 backdrop-blur-md p-6 w-full max-w-2xl mx-auto mt-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Your Financial Story</h2>
      <div className="text-lg font-semibold text-blue-700 mb-1">{story.month}</div>
      <div className="mb-4 text-gray-700">{story.summary}</div>
      <div className="flex gap-4 mb-4">
        {story.highlights.map(h => (
          <div key={h.label} className="bg-white/70 rounded-lg px-3 py-2 shadow text-sm text-gray-800">
            <span className="font-medium text-blue-600">{h.label}:</span> {h.value}
          </div>
        ))}
      </div>
      <BarChart data={story.chartData} />
      <div className="mt-4 text-gray-600 text-sm">
        <span>Tip: Your financial story is updated monthly. Stay tuned for new insights and highlights!</span>
      </div>
    </div>
  );
};

export default FinancialStory;
