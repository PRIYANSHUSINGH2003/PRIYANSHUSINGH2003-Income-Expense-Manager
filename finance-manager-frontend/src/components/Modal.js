import React, { useEffect, useRef } from 'react';

export default function Modal({ open, onClose, title, children, className = '', widthClass = 'max-w-2xl' }) {
  const modalRef = useRef();

  // Focus trap and ESC close
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
    >
      {/* Overlay with gradient and blur for both modes */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-black/60 dark:from-[#232336]/90 dark:via-[#232336]/70 dark:to-[#288cfa]/20 backdrop-blur-[3px] transition-all duration-300"
        onClick={onClose}
        aria-label="Close modal overlay"
      />
      <div
        ref={modalRef}
        className={`relative bg-glass dark:bg-glass rounded-2xl p-8 shadow-2xl min-w-[320px] ${widthClass} w-full animate-modal-pop transition-glass ${className}`}
        tabIndex={0}
      >
        {title && (
          <h3 className="text-2xl font-extrabold mb-4 text-primary dark:text-accent text-center tracking-tight flex items-center justify-center gap-2">
            {title}
          </h3>
        )}
        <button
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-transparent hover:bg-black/10 dark:hover:bg-white/10 text-gray-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
          onClick={onClose}
          aria-label="Close modal"
          tabIndex={0}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        {children}
      </div>
      <style>{`
        @keyframes modal-pop {
          0% { opacity: 0; transform: scale(0.96) translateY(16px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-modal-pop { animation: modal-pop 0.32s cubic-bezier(.4,0,.2,1); }
      `}</style>
    </div>
  );
}
