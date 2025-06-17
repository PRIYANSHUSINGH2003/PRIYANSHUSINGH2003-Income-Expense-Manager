import React, { useState, useRef } from 'react';
import Modal from './Modal';
import InputField from './InputField';
import AnimatedButton from './AnimatedButton';

export default function ProfileUpdateModal({ open, onClose, user, onSave }) {
  const [form, setForm] = useState({
    username: user?.username || '',
    email: user?.email || '',
    password: '',
    avatar: user?.avatar || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState(user?.avatar || '');
  const fileInputRef = useRef();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
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
      // Simulate API call
      await new Promise(res => setTimeout(res, 1000));
      onSave && onSave(form);
      onClose();
    } catch (err) {
      setError('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Update Profile">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Modern Avatar Upload */}
        <div className="flex flex-col items-center mb-2">
          <div className="relative group">
            <div className="rounded-full ring-4 ring-primary/40 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 shadow-xl bg-gradient-to-br from-primary/20 to-accent/20 transition-all duration-300 hover:scale-105">
              <img
                src={imagePreview || '/default-avatar.png'}
                alt="Avatar Preview"
                className="w-28 h-28 object-cover rounded-full border-4 border-white dark:border-gray-900 shadow-lg"
              />
            </div>
            <button
              type="button"
              className="absolute bottom-2 right-2 bg-gradient-to-br from-primary to-accent text-white rounded-full p-2 shadow-lg border-2 border-white dark:border-gray-900 flex items-center justify-center hover:scale-110 transition-transform"
              onClick={handleAvatarClick}
              tabIndex={-1}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828L18 9.828M7 7h.01" /></svg>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          <div className="mt-2 text-gray-500 text-xs">Click the camera to change your photo</div>
        </div>
        <InputField label="Username" name="username" value={form.username} onChange={handleChange} required />
        <InputField label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
        <InputField label="Password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="New password (optional)" />
        {/* Optionally show avatar URL for fallback */}
        {/* <InputField label="Avatar URL" name="avatar" value={form.avatar} onChange={handleChange} placeholder="https://..." /> */}
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <div className="flex gap-2 justify-end mt-2">
          <AnimatedButton type="button" className="bg-gray-400 hover:bg-gray-500" onClick={onClose}>Cancel</AnimatedButton>
          <AnimatedButton type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</AnimatedButton>
        </div>
      </form>
    </Modal>
  );
}
