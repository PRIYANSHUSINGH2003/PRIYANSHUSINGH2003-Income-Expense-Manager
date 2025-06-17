import React from 'react';

export default function AnimatedButton({ children, className = '', ...props }) {
  return (
    <button
      className={`px-6 py-2 rounded-xl font-bold bg-primary text-white dark:text-white text-gray-900 transition-all duration-200 hover:bg-primary/90 active:scale-95 shadow-glass ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
