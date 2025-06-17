import React from 'react';

export default function Reports() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-primary dark:text-accent">Reports</h2>
      <p className="mb-4">This is the new Reports page. Here you can view financial summaries, trends, and analytics.</p>
      {/* Example content, replace with real analytics as needed */}
      <ul className="list-disc pl-6 text-gray-700 dark:text-gray-200">
        <li>Monthly Income & Expense Summary</li>
        <li>Stock Performance Overview</li>
        <li>Invoice Payment Trends</li>
        <li>Custom Financial Reports</li>
      </ul>
    </div>
  );
}
