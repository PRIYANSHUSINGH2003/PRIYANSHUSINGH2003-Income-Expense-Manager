import React from 'react';

const colorMap = {
  online: 'bg-green-400',
  offline: 'bg-gray-400',
  busy: 'bg-yellow-400',
  error: 'bg-red-400',
};

export default function StatusDot({ status = 'offline', className = '' }) {
  return (
    <span className={`inline-block w-3 h-3 rounded-full border-2 border-white ${colorMap[status] || colorMap.offline} ${className}`}></span>
  );
}
