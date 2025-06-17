import React, { useState } from 'react';

const moods = [
  { label: 'Confident', emoji: '😃', color: 'bg-green-400' },
  { label: 'Neutral', emoji: '😐', color: 'bg-gray-400' },
  { label: 'Anxious', emoji: '😟', color: 'bg-yellow-400' },
  { label: 'Stressed', emoji: '😣', color: 'bg-red-400' },
  { label: 'Excited', emoji: '🤩', color: 'bg-blue-400' },
];

// Dummy data for demonstration
const dummyMoodData = [
  { date: '2024-06-01', mood: 'Confident', note: 'Saved extra this week!' },
  { date: '2024-06-02', mood: 'Neutral', note: '' },
  { date: '2024-06-03', mood: 'Anxious', note: 'Unexpected bill.' },
  { date: '2024-06-04', mood: 'Confident', note: '' },
  { date: '2024-06-05', mood: 'Excited', note: 'Bonus received!' },
  { date: '2024-06-06', mood: 'Stressed', note: 'Overspent on shopping.' },
  { date: '2024-06-07', mood: 'Neutral', note: '' },
];

const MoodChart = ({ data }) => {
  // Map mood to color/emoji
  const moodMap = moods.reduce((acc, m) => { acc[m.label] = m; return acc; }, {});
  return (
    <div className="flex items-end gap-2 h-24 w-full mt-4">
      {data.map((d, i) => (
        <div key={i} className="flex flex-col items-center w-8">
          <div
            className={`rounded-t-lg ${moodMap[d.mood]?.color || 'bg-gray-200'} shadow-md`}
            style={{ height: '40px', width: '100%' }}
            title={d.mood}
          >
            <span className="block text-xl text-center">{moodMap[d.mood]?.emoji || '❓'}</span>
          </div>
          <span className="text-[10px] mt-1 text-gray-700 text-center">{d.date.slice(5)}</span>
        </div>
      ))}
    </div>
  );
};

const FinancialMoodTracker = () => {
  const [moodData, setMoodData] = useState(dummyMoodData);
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');
  const [success, setSuccess] = useState(false);

  const handleLogMood = (e) => {
    e.preventDefault();
    if (!selectedMood) return;
    const today = new Date().toISOString().slice(0, 10);
    setMoodData([
      ...moodData,
      { date: today, mood: selectedMood.label, note },
    ]);
    setSelectedMood(null);
    setNote('');
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div className="rounded-2xl shadow-xl bg-white/40 backdrop-blur-md p-6 w-full max-w-2xl mx-auto mt-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Financial Mood Tracker</h2>
      <form onSubmit={handleLogMood} className="mb-6 flex flex-col gap-2">
        <div className="flex gap-3 mb-2">
          {moods.map(m => (
            <button
              key={m.label}
              type="button"
              className={`flex flex-col items-center px-3 py-2 rounded-lg shadow transition border-2 ${selectedMood?.label === m.label ? 'border-blue-500' : 'border-transparent'} ${m.color}`}
              onClick={() => setSelectedMood(m)}
              title={m.label}
            >
              <span className="text-2xl">{m.emoji}</span>
              <span className="text-xs text-white font-semibold">{m.label}</span>
            </button>
          ))}
        </div>
        <textarea
          className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 mb-2 bg-white/70"
          rows={2}
          placeholder="Add a note (optional)"
          value={note}
          onChange={e => setNote(e.target.value)}
        />
        <button
          type="submit"
          className="w-full py-2 px-4 rounded-lg bg-blue-500 text-white font-semibold shadow-md hover:bg-blue-600 transition"
        >
          Log Mood
        </button>
        {success && <div className="text-green-600 mt-2">Mood logged!</div>}
      </form>
      <div>
        <h3 className="text-lg font-semibold mb-2">Mood Trend (Past Week)</h3>
        <MoodChart data={moodData.slice(-7)} />
      </div>
      <div className="mt-4 text-gray-600 text-sm">
        <span>Tip: Track your financial mood to discover patterns and improve your money mindset!</span>
      </div>
    </div>
  );
};

export default FinancialMoodTracker;
