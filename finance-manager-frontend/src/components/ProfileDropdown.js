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
        className="flex items-center gap-2 p-2 rounded-full bg-glass dark:bg-glassDark shadow-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-200"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open profile menu"
      >
        <Avatar alt={user?.username || 'U'} size={36} />
        <span className="font-semibold text-primary dark:text-accent">{user?.username || 'User'}</span>
      </button>
      {open && (
        <DropdownMenu className="absolute right-0 mt-2 w-56 bg-glass dark:bg-glassDark rounded-xl shadow-2xl z-50 border border-gray-200 dark:border-gray-700 animate-fade-in-up backdrop-blur-lg">
          <button
            className="w-full text-left px-5 py-3 font-semibold hover:bg-primary/10 dark:hover:bg-primary/20 rounded-t-2xl transition"
            onClick={handleViewProfile}
          >
            View Profile
          </button>
          <button
            className="w-full text-left px-5 py-3 font-semibold hover:bg-primary/10 dark:hover:bg-primary/20 transition"
            onClick={handleSettings}
          >
            Settings
          </button>
          <button
            className="w-full text-left px-5 py-3 font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-b-2xl transition"
            onClick={() => {
              setOpen(false);
              onLogout && onLogout();
            }}
          >
            Logout
          </button>
        </DropdownMenu>
      )}
      {showProfileModal && (
        <ProfileUpdateModal open={showProfileModal} onClose={() => setShowProfileModal(false)} user={user} />
      )}
    </div>
  );
}
