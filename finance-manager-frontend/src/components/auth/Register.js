import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';

export default function Register({ onSwitch }) {
  const { register } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await register(username, password, role);
      setSuccess('Registration successful! You can now sign in.');
      setUsername('');
      setPassword('');
      setRole('user');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-light/40 to-primary/60 dark:from-gray-900 dark:to-primary/80 transition-colors duration-500">
      <div className="w-full max-w-md p-8 rounded-3xl shadow-glass bg-glass dark:bg-glassDark backdrop-blur-xl border border-white/20 dark:border-gray-700 animate-fade-in">
        <h2 className="text-3xl font-heading font-extrabold text-primary dark:text-white mb-6 text-center drop-shadow">Sign Up</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="px-4 py-3 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary outline-none font-medium text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all"
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            autoFocus
          />
          <input
            className="px-4 py-3 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary outline-none font-medium text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <select
            className="px-4 py-3 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary outline-none font-medium text-gray-800 dark:text-gray-100 transition-all"
            value={role}
            onChange={e => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            className="mt-2 py-3 rounded-xl bg-primary hover:bg-primary-light dark:bg-primary-dark dark:hover:bg-primary transition-all font-bold text-white shadow-neu focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        {error && <div className="mt-4 text-red-500 text-center font-semibold animate-shake">{error}</div>}
        {success && <div className="mt-4 text-green-600 text-center font-semibold animate-fade-in">{success}</div>}
        <div className="mt-6 text-center text-gray-600 dark:text-gray-300">
          Already have an account?{' '}
          <button className="text-primary font-bold hover:underline" onClick={onSwitch}>Sign In</button>
        </div>
      </div>
    </div>
  );
}
