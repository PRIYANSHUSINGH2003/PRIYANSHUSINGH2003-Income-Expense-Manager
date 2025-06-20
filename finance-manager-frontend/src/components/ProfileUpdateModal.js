import React, { useState, useRef } from 'react';
import Modal from './Modal';
import InputField from './InputField';
import AnimatedButton from './AnimatedButton';
import { useAuth } from '../AuthContext';

export default function ProfileUpdateModal({ open, onClose, user, onSave }) {
  const { updateProfileImage } = useAuth();
  const [form, setForm] = useState({
    username: user?.username || '',
    email: user?.email || '',
    password: '',
    avatar: user?.avatar || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState(user?.avatar || '');
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setForm(f => ({ ...f, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (imageFile) {
        const res = await updateProfileImage(imageFile);
        setImagePreview(res.profileImage); // Use the new URL for preview
      }
      // You can add more profile update logic here (username, email, etc.)
      onSave && onSave(form);
      onClose();
    } catch (err) {
      setError(
        'Failed to update profile. ' +
        (err?.response?.data?.error ? err.response.data.error + '. ' : '') +
        (err?.response?.data?.message ? err.response.data.message + '. ' : '') +
        (err?.response?.data?.details ? err.response.data.details + '. ' : '') +
        (err?.message || '')
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} widthClass="max-w-3xl">
      <form onSubmit={handleSubmit} className="profile-modal-card flex flex-col gap-2">
        <div className="profile-modal-title flex flex-col items-center gap-2 mb-2">
          <span className="flex items-center gap-2">
            <svg className="w-9 h-9 text-primary dark:text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <span className="text-2xl font-extrabold tracking-tight">Update Profile</span>
          </span>
          <span className="text-base text-muted font-normal mt-1">Keep your account info up to date</span>
        </div>
        <div className="profile-modal-avatar relative flex flex-col items-center mb-4">
          <div className="relative group">
            <img
              src={imagePreview && !imagePreview.startsWith('http') && !imagePreview.startsWith('data:')
                ? `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}${imagePreview}`
                : (imagePreview || '/default-avatar.png')}
              alt="Avatar Preview"
              className="profile-modal-avatar-img shadow-lg border-4 border-bg-surface dark:border-bg-surface transition-all duration-200 group-hover:brightness-90"
            />
            <button
              type="button"
              className="profile-modal-avatar-btn absolute bottom-2 right-2 bg-gradient-to-br from-primary to-accent text-white shadow-lg border-2 border-bg-surface dark:border-bg-surface group-hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
              onClick={handleAvatarClick}
              tabIndex={0}
              aria-label="Change avatar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828L18 9.828M7 7h.01" /></svg>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          <div className="profile-modal-label mt-2 text-sm text-muted">Click the camera to change your photo</div>
        </div>
        <div className="profile-modal-fields flex flex-col gap-4 mb-2">
          <InputField label="Username" name="username" value={form.username} onChange={handleChange} required inputClassName="profile-modal-input"/>
          <InputField label="Email" name="email" type="email" value={form.email} onChange={handleChange} required inputClassName="profile-modal-input"/>
          <InputField label="Password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="New password (optional)" inputClassName="profile-modal-input" />
        </div>
        {error && <div className="profile-modal-error mt-2">{error}</div>}
        <div className="profile-modal-btns flex gap-3 justify-end mt-4">
          <button type="button" className="profile-modal-btn-cancel" onClick={onClose}>Cancel</button>
          <AnimatedButton type="submit" className="profile-modal-btn" disabled={loading} loading={loading}>
            Save
          </AnimatedButton>
        </div>
      </form>
    </Modal>
  );
}
