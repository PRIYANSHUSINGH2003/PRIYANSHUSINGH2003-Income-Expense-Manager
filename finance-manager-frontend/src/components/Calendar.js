import React, { useState } from 'react';
import { formatDate } from '../utils/date';

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export default function Calendar({ value, onChange, className = '' }) {
  const today = new Date();
  const [current, setCurrent] = useState(value ? new Date(value) : today);
  const year = current.getFullYear();
  const month = current.getMonth();
  const days = getDaysInMonth(year, month);
  const firstDay = new Date(year, month, 1).getDay();

  return (
    <div className={`bg-glass dark:bg-glassDark rounded-2xl p-4 shadow-neu w-max ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <button onClick={() => setCurrent(new Date(year, month - 1, 1))}>&lt;</button>
        <span className="font-bold">{current.toLocaleString('default', { month: 'long' })} {year}</span>
        <button onClick={() => setCurrent(new Date(year, month + 1, 1))}>&gt;</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs mb-1">
        {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => <div key={d} className="font-bold">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {Array(firstDay).fill(null).map((_, i) => <div key={i}></div>)}
        {Array(days).fill(null).map((_, i) => {
          const day = i + 1;
          const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
          return (
            <button
              key={day}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${isToday ? 'bg-primary text-white' : 'hover:bg-primary/10 dark:hover:bg-primary/20'}`}
              onClick={() => onChange && onChange(new Date(year, month, day))}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
