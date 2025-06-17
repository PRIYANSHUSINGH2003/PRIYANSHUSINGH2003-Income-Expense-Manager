import React, { useState } from 'react';

export default function SelectDropdown({ label, options, value, onChange, icon, className = '', ...props }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`mb-4 relative ${className}`} tabIndex={0} onBlur={() => setOpen(false)}>
      {label && <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">{label}</label>}
      <button
        type="button"
        className="w-full flex items-center justify-between px-4 py-2 rounded-xl bg-glass dark:bg-glassDark border border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition-all duration-200 shadow-neu"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="flex items-center gap-2">
          {icon && <span>{icon}</span>}
          {options.find(o => o.value === value)?.label || 'Select...'}
        </span>
        <svg className={`w-4 h-4 ml-2 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <ul className="absolute left-0 right-0 mt-2 bg-glass dark:bg-glassDark rounded-xl shadow-lg z-10 max-h-60 overflow-auto border border-gray-200 dark:border-gray-700 animate-fade-in-up">
          {options.map(opt => (
            <li
              key={opt.value}
              className={`px-4 py-2 cursor-pointer hover:bg-primary/10 dark:hover:bg-primary/20 ${value === opt.value ? 'bg-primary/10 dark:bg-primary/20 font-bold' : ''}`}
              onClick={() => { onChange(opt.value); setOpen(false); }}
            >
              <span className="flex items-center gap-2">{opt.icon && <span>{opt.icon}</span>}{opt.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
