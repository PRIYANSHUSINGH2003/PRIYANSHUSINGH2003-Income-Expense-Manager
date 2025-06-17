import React from 'react';

const colorMap = {
  success: 'bg-green-100 text-green-700',
  warning: 'bg-yellow-100 text-yellow-700',
  error: 'bg-red-100 text-red-700',
  info: 'bg-blue-100 text-blue-700',
  default: 'bg-gray-200 text-gray-700',
};

export default function Badge({ children, type = 'default', icon, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full font-semibold text-xs ${colorMap[type] || colorMap.default} ${className}`}>
      {icon && <span className="text-base">{icon}</span>}
      {children}
    </span>
  );
}
