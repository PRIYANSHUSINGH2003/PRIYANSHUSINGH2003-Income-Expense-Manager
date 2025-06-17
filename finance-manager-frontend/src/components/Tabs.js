import React, { useState } from 'react';

export default function Tabs({ tabs = [], initial = 0, className = '', onTabChange }) {
  const [active, setActive] = useState(initial);
  return (
    <div className={`w-full ${className}`}>
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700 mb-4">
        {tabs.map((tab, idx) => (
          <button
            key={tab.label}
            className={`px-4 py-2 font-semibold rounded-t-lg transition-all duration-200 focus:outline-none ${active === idx ? 'bg-glass dark:bg-glassDark text-primary dark:text-accent border-b-2 border-primary dark:border-accent' : 'text-gray-500 dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-primary/20'}`}
            onClick={() => { setActive(idx); onTabChange && onTabChange(idx); }}
          >
            {tab.icon && <span className="mr-2 align-middle">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>
      <div>{tabs[active]?.content}</div>
    </div>
  );
}
