import React from 'react';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
export default function Avatar({ src, alt, size = 40, status, className = '' }) {
  let finalSrc = src;
  if (src && !src.startsWith('http') && !src.startsWith('data:')) {
    finalSrc = `${API_BASE_URL}${src}`;
  }
  return (
    <div className={`relative inline-block ${className}`} style={{ width: size, height: size }}>
      {finalSrc ? (
        <img
          src={finalSrc}
          alt={alt || 'Avatar'}
          className="w-full h-full object-cover rounded-full border-2 border-primary shadow-neu"
          onError={e => { e.target.onerror = null; e.target.src = '/default-avatar.png'; }}
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
