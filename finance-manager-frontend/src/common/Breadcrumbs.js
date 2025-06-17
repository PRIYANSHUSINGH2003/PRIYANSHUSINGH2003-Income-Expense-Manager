import React from 'react';

export default function Breadcrumbs({ items = [], className = '' }) {
  return (
    <nav className={`flex items-center text-sm text-gray-500 dark:text-gray-300 gap-1 ${className}`} aria-label="Breadcrumb">
      {items.map((item, idx) => (
        <span key={item.label} className="flex items-center">
          {idx > 0 && <span className="mx-1">/</span>}
          {item.href ? (
            <a href={item.href} className="hover:underline text-primary dark:text-accent">{item.label}</a>
          ) : (
            <span className="font-semibold">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
