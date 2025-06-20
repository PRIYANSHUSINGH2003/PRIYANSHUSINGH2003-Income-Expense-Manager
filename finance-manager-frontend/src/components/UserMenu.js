import React, { useRef, useState } from 'react';
import useClickOutside from '../hooks/useClickOutside';
import Avatar from './Avatar';
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
function getProfileImageUrl(profileImage) {
  return profileImage && !profileImage.startsWith('http')
    ? `${API_BASE_URL}${profileImage}`
    : profileImage;
}

export default function UserMenu({ user, onLogout, onProfile, onSettings }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useClickOutside(ref, () => setOpen(false));
  return (
    <div className="relative" ref={ref}>
      <button className="flex items-center gap-2 p-2 rounded-full bg-glass shadow hover:bg-primary/10 dark:hover:bg-primary/20" onClick={() => setOpen(v => !v)}>
        <Avatar src={getProfileImageUrl(user?.profileImage)} alt={user?.username || 'U'} size={36} />
        <span className="font-semibold text-accent">{user?.username || 'User'}</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-glass shadow-glass backdrop-blur-xl rounded-xl z-50 border border-gray-200 dark:border-gray-700 animate-fade-in-up">
          <button className="w-full text-left px-5 py-3 text-main font-semibold hover:bg-primary/10 dark:hover:bg-primary/20" onClick={onProfile}>Profile</button>
          <button className="w-full text-left px-5 py-3 text-main font-semibold hover:bg-primary/10 dark:hover:bg-primary/20" onClick={onSettings}>Settings</button>
          <button className="w-full text-left px-5 py-3 font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-b-2xl" onClick={onLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}
