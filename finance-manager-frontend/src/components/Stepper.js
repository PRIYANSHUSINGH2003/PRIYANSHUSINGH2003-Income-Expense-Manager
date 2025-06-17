import React from 'react';

export default function Stepper({ steps = [], active = 0, className = '' }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {steps.map((step, idx) => (
        <div key={step.label} className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${idx <= active ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700'}`}>{idx + 1}</div>
          <span className={`font-semibold ${idx === active ? 'text-primary dark:text-accent' : 'text-gray-500 dark:text-gray-300'}`}>{step.label}</span>
          {idx < steps.length - 1 && <div className="w-8 h-1 bg-gray-300 dark:bg-gray-700 rounded" />}
        </div>
      ))}
    </div>
  );
}
