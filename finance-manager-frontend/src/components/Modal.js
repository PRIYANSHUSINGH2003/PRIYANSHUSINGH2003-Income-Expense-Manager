import React from 'react';

export default function Modal({ open, onClose, title, children, className = '' }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-fade-in">
      <div className={`bg-glass dark:bg-glassDark rounded-2xl p-8 shadow-xl min-w-[320px] max-w-lg w-full relative ${className}`}>
        {title && <h3 className="text-xl font-bold mb-4 text-primary dark:text-accent">{title}</h3>}
        <button
          className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-red-500 transition-colors"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
