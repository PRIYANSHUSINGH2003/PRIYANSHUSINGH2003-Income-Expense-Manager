import React from 'react';

export default function FloatingActionButton({ icon, onClick, className = '', ...props }) {
  return (
    <button
      className={`fixed bottom-8 right-8 z-40 w-16 h-16 rounded-full bg-primary text-white shadow-xl flex items-center justify-center text-3xl hover:bg-accent transition-all duration-200 ${className}`}
      onClick={onClick}
      {...props}
    >
      {icon || '+'}
    </button>
  );
}
