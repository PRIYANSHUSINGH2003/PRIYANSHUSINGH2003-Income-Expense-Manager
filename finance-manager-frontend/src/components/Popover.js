import React, { useRef, useState } from 'react';
import useClickOutside from '../hooks/useClickOutside';

export default function Popover({ trigger, content, className = '' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useClickOutside(ref, () => setOpen(false));

  return (
    <div className={`relative inline-block ${className}`} ref={ref}>
      <span onClick={() => setOpen((v) => !v)} tabIndex={0} className="cursor-pointer">
        {trigger}
      </span>
      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 mt-2 min-w-[200px] bg-glass dark:bg-glassDark rounded-xl shadow-lg z-50 border border-gray-200 dark:border-gray-700 p-4 animate-fade-in-up">
          {content}
        </div>
      )}
    </div>
  );
}
