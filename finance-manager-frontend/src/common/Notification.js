import React from 'react';

export default function Notification({ message, type = 'info', onClose }) {
  const typeStyles = {
    info: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
  };
  return (
    <div className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 animate-fade-in-up ${typeStyles[type] || typeStyles.info}`}>
      <span className="font-semibold">{message}</span>
      {onClose && (
        <button className="ml-2 text-lg font-bold" onClick={onClose}>&times;</button>
      )}
    </div>
  );
}
