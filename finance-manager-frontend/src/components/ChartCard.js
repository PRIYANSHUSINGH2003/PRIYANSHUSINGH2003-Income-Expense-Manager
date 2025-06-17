import React from 'react';

export default function ChartCard({ title, actions, children, className = '' }) {
  return (
    <div className={`bg-glass dark:bg-glassDark rounded-2xl p-6 shadow-neu mb-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="font-bold text-lg text-primary dark:text-accent">{title}</div>
        {actions && <div>{actions}</div>}
      </div>
      {children}
    </div>
  );
}
