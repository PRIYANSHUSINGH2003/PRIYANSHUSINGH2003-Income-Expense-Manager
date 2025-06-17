import React from 'react';

/**
 * GlassCard - A reusable glassmorphism-styled card for premium UI containers.
 * Usage: Wrap dashboard widgets, summary cards, modals, etc.
 */
export default function GlassCard({ children, className = '', ...props }) {
  return (
    <div
      className={`shadow-glass backdrop-blur-md bg-glass-light dark:bg-glass-dark rounded-2xl border border-white/30 dark:border-gray-700 transition-all duration-300 ${className}`}
      style={{
        boxShadow: '0 8px 32px 0 rgba(31,38,135,0.18)',
        background: 'linear-gradient(120deg, rgba(255,255,255,0.6) 0%, rgba(230,245,255,0.7) 100%)',
        backdropFilter: 'blur(8px)',
      }}
      {...props}
    >
      {children}
    </div>
  );
}
