import React from 'react';

export default function Tag({ children, onRemove, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-accent font-semibold text-xs ${className}`}>
      {children}
      {onRemove && (
        <button className="ml-1 text-lg font-bold hover:text-red-500" onClick={onRemove}>&times;</button>
      )}
    </span>
  );
}
