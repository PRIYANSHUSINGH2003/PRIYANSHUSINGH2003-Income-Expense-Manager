import React from 'react';

export default function InputField({ label, error, className = '', inputClassName = '', inputProps = {}, ...props }) {
  return (
    <div className={`mb-4 ${className}`}>
      {label && <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">{label}</label>}
      <input
        className={`w-full px-2 py-2 rounded-xl bg-glass dark:bg-glassDark border border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition-all duration-200 shadow-neu ${inputClassName}`}
        {...props}
        {...inputProps}
      />
      {error && <div className="text-sm text-red-500 mt-1">{error}</div>}
    </div>
  );
}
