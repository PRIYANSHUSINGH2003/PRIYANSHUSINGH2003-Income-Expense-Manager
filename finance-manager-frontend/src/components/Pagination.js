import React from 'react';

export default function Pagination({ page, totalPages, onPageChange, className = '' }) {
  if (totalPages <= 1) return null;
  return (
    <div className={`flex gap-2 items-center justify-center mt-4 ${className}`}>
      <button
        className="px-3 py-1 rounded-lg bg-glass dark:bg-glassDark shadow hover:bg-primary/10 dark:hover:bg-primary/20 disabled:opacity-50"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
      >
        &lt;
      </button>
      {[...Array(totalPages)].map((_, idx) => (
        <button
          key={idx}
          className={`px-3 py-1 rounded-lg font-semibold transition-all ${page === idx + 1 ? 'bg-primary text-white' : 'bg-glass dark:bg-glassDark text-primary dark:text-white hover:bg-primary/10 dark:hover:bg-primary/20'}`}
          onClick={() => onPageChange(idx + 1)}
        >
          {idx + 1}
        </button>
      ))}
      <button
        className="px-3 py-1 rounded-lg bg-glass dark:bg-glassDark shadow hover:bg-primary/10 dark:hover:bg-primary/20 disabled:opacity-50"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
      >
        &gt;
      </button>
    </div>
  );
}
