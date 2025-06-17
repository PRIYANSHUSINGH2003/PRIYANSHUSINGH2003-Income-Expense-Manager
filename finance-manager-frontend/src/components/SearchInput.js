import React, { useRef } from 'react';

export default function SearchInput({ value, onChange, placeholder = 'Search...', className = '' }) {
  const inputRef = useRef();
  return (
    <div className={`relative flex items-center ${className}`}>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-12 py-3 rounded-full bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition-all duration-200 text-base font-medium shadow-[0_2px_16px_0_rgba(31,38,135,0.08)] focus:scale-[1.03] text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 backdrop-blur"
        style={{
          background: document.documentElement.classList.contains('dark')
            ? 'linear-gradient(90deg,rgba(255,255,255,0.92) 0%,rgba(240,246,255,0.85) 100%)' 
            : 'linear-gradient(90deg,rgba(17,24,39,0.92) 0%,rgba(30,41,59,0.85) 100%)'

        }}
      />
      {value && (
        <button
          className="absolute right-4 text-gray-400 hover:text-red-500 text-xl transition-colors"
          onClick={() => { onChange(''); inputRef.current.focus(); }}
          tabIndex={-1}
          aria-label="Clear search"
        >
          &times;
        </button>
      )}
      <span className="absolute left-4 text-primary dark:text-primary-200 pointer-events-none">
        <svg className="w-6 h-6 drop-shadow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      </span>
    </div>
  );
}
