import React from 'react';

export default function GlassCard({ children, className = '', ...props }) {
  return (
    <div
      className={`bg-glass dark:bg-glassDark shadow-glass dark:shadow-neu rounded-2xl p-6 backdrop-blur-xl border border-white/30 dark:border-gray-700 transition-colors duration-500 hover:shadow-xl hover:scale-[1.02] active:scale-100 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
