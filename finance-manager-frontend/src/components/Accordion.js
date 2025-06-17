import React, { useState } from 'react';

export default function Accordion({ items = [], className = '' }) {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <div className={`w-full ${className}`}>
      {items.map((item, idx) => (
        <div key={item.title} className="mb-2">
          <button
            className="w-full flex justify-between items-center px-4 py-3 rounded-xl bg-glass dark:bg-glassDark shadow-neu font-semibold text-left transition-all duration-200 focus:outline-none"
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
          >
            <span>{item.title}</span>
            <svg className={`w-5 h-5 ml-2 transition-transform ${openIdx === idx ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </button>
          {openIdx === idx && (
            <div className="px-4 py-3 text-gray-700 dark:text-gray-200 animate-fade-in-up">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
