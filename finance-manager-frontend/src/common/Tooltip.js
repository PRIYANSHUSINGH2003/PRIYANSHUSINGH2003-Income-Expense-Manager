import React from 'react';

export default function Tooltip({ children, text, className = '' }) {
  return (
    <span className={`relative group ${className}`} tabIndex={0}>
      {children}
      <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max max-w-xs px-3 py-1 rounded-lg bg-black/80 text-white text-xs opacity-0 group-hover:opacity-100 group-focus:opacity-100 pointer-events-none transition-opacity z-20">
        {text}
      </span>
    </span>
  );
}
