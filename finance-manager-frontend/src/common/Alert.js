import React from 'react';

const typeStyles = {
  info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/70 dark:text-blue-100',
  success: 'bg-green-100 text-green-800 dark:bg-green-900/70 dark:text-green-100',
  warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/70 dark:text-yellow-100',
  error: 'bg-red-100 text-red-800 dark:bg-red-900/70 dark:text-red-100',
};

export default function Alert({ children, type = 'info', onClose, className = '' }) {
  return (
    <div
      className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-lg ${typeStyles[type] || typeStyles.info} ${className}`}
      style={{
        backdropFilter: 'blur(12px) saturate(180%)',
        WebkitBackdropFilter: 'blur(12px) saturate(180%)',
        background: 'rgba(255,255,255,0.55)',
        border: '1.5px solid rgba(30,64,175,0.10)',
      }}
    >
      <span className="font-semibold flex-1">{children}</span>
      {onClose && (
        <button className="ml-2 text-lg font-bold" onClick={onClose}>&times;</button>
      )}
    </div>
  );
}
