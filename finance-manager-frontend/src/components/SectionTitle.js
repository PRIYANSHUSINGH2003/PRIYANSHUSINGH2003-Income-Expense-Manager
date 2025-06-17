import React from 'react';

export default function SectionTitle({ children, className = '', ...props }) {
  return (
    <h2 className={`text-2xl font-bold font-heading mb-4 text-gray-800 dark:text-gray-200 ${className}`} {...props}>
      {children}
    </h2>
  );
}
