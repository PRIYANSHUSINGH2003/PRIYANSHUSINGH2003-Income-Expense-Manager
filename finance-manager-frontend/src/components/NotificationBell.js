import React, { useState, useRef } from 'react';
import useClickOutside from '../hooks/useClickOutside';

export default function NotificationBell({ notifications = [] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useClickOutside(ref, () => setOpen(false));
  return (
    <div className="relative" ref={ref}>
      <button className="relative p-2 rounded-full bg-glass dark:bg-glassDark shadow hover:bg-primary/10 dark:hover:bg-primary/20" onClick={() => setOpen(v => !v)}>
        <svg className="w-6 h-6 text-primary dark:text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
        {notifications.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full shadow">{notifications.length}</span>}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-glass dark:bg-glassDark rounded-xl shadow-lg z-50 border border-gray-200 dark:border-gray-700 animate-fade-in-up">
          <div className="p-4 font-bold border-b border-gray-200 dark:border-gray-700">Notifications</div>
          <ul className="max-h-60 overflow-auto">
            {notifications.length === 0 ? (
              <li className="p-4 text-gray-400 text-center">No notifications</li>
            ) : notifications.map((n, i) => (
              <li key={i} className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 text-sm hover:bg-primary/10 dark:hover:bg-primary/20 cursor-pointer">{n}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
