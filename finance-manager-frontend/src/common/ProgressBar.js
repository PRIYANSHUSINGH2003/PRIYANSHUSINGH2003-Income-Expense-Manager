import React from 'react';

export default function ProgressBar({ value, max = 100, className = '' }) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={`w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${className}`}>
      <div
        className="h-full bg-primary dark:bg-accent transition-all duration-300"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
