import React from 'react';

export default function Skeleton({ width = '100%', height = 20, className = '' }) {
  return (
    <div
      className={`bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${className}`}
      style={{ width, height }}
    />
  );
}
