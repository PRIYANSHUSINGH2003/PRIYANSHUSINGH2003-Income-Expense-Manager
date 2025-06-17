import React from 'react';

const typeStyles = {
  info: 'bg-blue-100 text-blue-800',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  error: 'bg-red-100 text-red-800',
};

export default function Alert({ children, type = 'info', onClose, className = '' }) {
  return (
    <div className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-lg ${typeStyles[type] || typeStyles.info} ${className}`}>
      <span className="font-semibold flex-1">{children}</span>
      {onClose && (
        <button className="ml-2 text-lg font-bold" onClick={onClose}>&times;</button>
      )}
    </div>
  );
}
