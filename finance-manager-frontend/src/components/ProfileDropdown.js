import React, { useRef, useState, useContext } from 'react';
import useClickOutside from '../hooks/useClickOutside';
import Avatar from './Avatar';
import DropdownMenu from './DropdownMenu';
import ProfileUpdateModal from './ProfileUpdateModal';
import { ThemeContext } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

export default function ProfileDropdown({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const ref = useRef();
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  useClickOutside(ref, () => setOpen(false));

  const handleViewProfile = () => {
    setShowProfileModal(true);
    setOpen(false);
  };

  const handleSettings = () => {
    setOpen(false);
    navigate('/settings');
  };

  return (
    <div className="relative" ref={ref}>
      <button
        className="flex items-center gap-3 p-2 rounded-full bg-white/60 dark:bg-gray-900/70 shadow-xl border border-primary/10 dark:border-accent/10 hover:bg-primary/10 dark:hover:bg-accent/10 transition-all duration-200 backdrop-blur-md"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open profile menu"
      >
        <Avatar alt={user?.username || 'U'} size={38} />
        <span className="font-bold text-lg text-primary dark:text-accent drop-shadow-sm tracking-wide">{user?.username || 'User'}</span>
      </button>
      {open && (
        <DropdownMenu className="absolute right-0 mt-2 w-60 bg-white/80 dark:bg-gray-900/90 rounded-2xl shadow-2xl z-50 border border-primary/10 dark:border-accent/10 animate-fade-in-up backdrop-blur-xl">
          <div className="px-5 pt-5 pb-2 flex flex-col items-center border-b border-primary/10 dark:border-accent/10">
            <Avatar alt={user?.username || 'U'} size={54} />
            <span className="mt-2 font-semibold text-primary dark:text-accent text-base">{user?.username || 'User'}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{user?.email || ''}</span>
          </div>
          <button
            className="w-full text-left px-5 py-3 font-semibold hover:bg-primary/10 dark:hover:bg-accent/10 text-main dark:text-gray-100 rounded-t-2xl transition"
            onClick={handleViewProfile}
          >
            <span className="inline-flex items-center gap-2"><svg className="w-5 h-5 text-primary dark:text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>View Profile</span>
          </button>
          <button
            className="w-full text-left px-5 py-3 font-semibold hover:bg-primary/10 dark:hover:bg-accent/10 text-main dark:text-gray-100 transition"
            onClick={handleSettings}
          >
            <span className="inline-flex items-center gap-2"><svg className="w-5 h-5 text-primary dark:text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>Settings</span>
          </button>
          <button
            className="w-full text-left px-5 py-3 font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-b-2xl transition"
            onClick={() => {
              setOpen(false);
              onLogout && onLogout();
            }}
          >
            <span className="inline-flex items-center gap-2"><svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7" /></svg>Logout</span>
          </button>
        </DropdownMenu>
      )}
      {showProfileModal && (
        <ProfileUpdateModal open={showProfileModal} onClose={() => setShowProfileModal(false)} user={user} />
      )}
    </div>
  );
}
