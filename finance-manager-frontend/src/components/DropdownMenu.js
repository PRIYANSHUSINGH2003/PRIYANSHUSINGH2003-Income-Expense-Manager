import React, { useRef, useState } from 'react';
import useClickOutside from '../hooks/useClickOutside';

export default function DropdownMenu({ trigger, items = [], className = '' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useClickOutside(ref, () => setOpen(false));

  return (
    <div className={`relative inline-block ${className}`} ref={ref}>
      <div onClick={() => setOpen((v) => !v)} tabIndex={0} className="cursor-pointer">
        {trigger}
      </div>
      {open && (
        <ul className="absolute right-0 mt-2 min-w-[160px] bg-glass dark:bg-glassDark rounded-xl shadow-lg z-50 border border-gray-200 dark:border-gray-700 animate-fade-in-up">
          {items.map((item, idx) => (
            <li
              key={item.label || idx}
              className={`px-4 py-2 cursor-pointer hover:bg-primary/10 dark:hover:bg-primary/20 ${item.danger ? 'text-red-500' : ''}`}
              onClick={() => { setOpen(false); item.onClick && item.onClick(); }}
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && item.onClick && item.onClick()}
            >
              {item.icon && <span className="mr-2 align-middle">{item.icon}</span>}
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
