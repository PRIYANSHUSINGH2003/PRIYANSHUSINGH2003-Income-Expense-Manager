import React from 'react';

export default function Divider({ vertical = false, className = '' }) {
  return vertical ? (
    <div className={`w-px h-8 bg-gray-300 dark:bg-gray-700 mx-2 ${className}`} />
  ) : (
    <div className={`h-px w-full bg-gray-300 dark:bg-gray-700 my-4 ${className}`} />
  );
}
