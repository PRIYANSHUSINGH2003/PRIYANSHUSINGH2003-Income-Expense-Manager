import React from 'react';

export default function Avatar({ src, alt, size = 40, status, className = '' }) {
  return (
    <div className={`relative inline-block ${className}`} style={{ width: size, height: size }}>
      {src ? (
        <img
          src={src}
          alt={alt || 'Avatar'}
          className="w-full h-full object-cover rounded-full border-2 border-primary shadow-neu"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center rounded-full bg-primary dark:bg-accent text-white font-bold text-lg shadow-neu">
          {alt ? alt[0].toUpperCase() : '?'}
        </div>
      )}
      {status && (
        <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-900 ${status === 'online' ? 'bg-green-400' : 'bg-gray-400'}`}></span>
      )}
    </div>
  );
}
