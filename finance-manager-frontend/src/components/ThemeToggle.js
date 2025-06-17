import React from 'react';

export default function ThemeToggle({ darkMode, setDarkMode, className = '' }) {
  return (
    <button
      className={`relative w-14 h-8 flex items-center bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-white/30 dark:border-gray-700 shadow-lg dark:shadow-xl rounded-full transition-colors duration-500 focus:outline-none focus:ring-2 focus:ring-primary/60 ${className}`}
      aria-label="Toggle dark mode"
      aria-pressed={darkMode}
      tabIndex={0}
      onClick={() => setDarkMode(!darkMode)}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setDarkMode(!darkMode); }}
    >
      {/* Animated sliding knob */}
      <span
        className={`absolute left-1 top-1 w-6 h-6 rounded-full bg-gradient-to-br from-white/90 via-gray-200/80 to-gray-400/60 dark:from-gray-700 dark:via-gray-900 dark:to-black shadow-md transition-transform duration-500 ${darkMode ? 'translate-x-6' : 'translate-x-0'}`}
        style={{ boxShadow: darkMode ? '0 2px 12px 0 #2226, 0 1.5px 0 #fff2' : '0 2px 12px 0 #b6c2, 0 1.5px 0 #fff8' }}
      />
      {/* Sun icon */}
      <span
        className={`absolute left-2 top-2 transition-all duration-500 ${darkMode ? 'opacity-0 scale-75 -rotate-45' : 'opacity-100 scale-100 rotate-0'}`}
      >
        <svg className="w-4 h-4 text-yellow-400 drop-shadow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.93l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
      </span>
      {/* Moon icon */}
      <span
        className={`absolute right-2 top-2 transition-all duration-500 ${darkMode ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 rotate-45'}`}
      >
        <svg className="w-4 h-4 text-blue-400 dark:text-blue-200 drop-shadow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" /></svg>
      </span>
    </button>
  );
}
