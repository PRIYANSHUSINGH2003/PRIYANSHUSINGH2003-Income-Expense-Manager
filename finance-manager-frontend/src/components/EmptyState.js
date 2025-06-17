import React from 'react';
import Icon from './Icon';

export default function EmptyState({ icon = 'dashboard', title = 'No Data', description = '', action, className = '' }) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      <div className="mb-4 text-5xl text-primary/40 dark:text-accent/40">
        <Icon name={icon} />
      </div>
      <div className="text-xl font-bold mb-2">{title}</div>
      {description && <div className="text-gray-500 dark:text-gray-300 mb-4">{description}</div>}
      {action}
    </div>
  );
}
