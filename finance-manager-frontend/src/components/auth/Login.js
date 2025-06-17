import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';

export default function Login({ onSwitch }) {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-light/40 to-primary/60 dark:from-gray-900 dark:to-primary/80 transition-colors duration-500">
      <div className="w-full max-w-md p-8 rounded-3xl shadow-glass bg-glass dark:bg-glassDark backdrop-blur-xl border border-white/20 dark:border-gray-700 animate-fade-in">
        <h2 className="text-3xl font-heading font-extrabold text-primary dark:text-white mb-6 text-center drop-shadow">Sign In</h2>
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
          <button
            type="submit"
            className="mt-2 py-3 rounded-xl bg-primary hover:bg-primary-light dark:bg-primary-dark dark:hover:bg-primary transition-all font-bold text-white shadow-neu focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <button
          type="button"
          className="mt-4 w-full py-2 rounded-xl bg-accent hover:bg-primary-dark text-white font-bold shadow transition-all"
          onClick={async () => {
            setUsername('testuser');
            setPassword('testpass');
            setLoading(true);
            setError('');
            try {
              await login('testuser', 'testpass');
            } catch (err) {
              setError(err.response?.data?.error || 'Login failed');
            } finally {
              setLoading(false);
            }
          }}
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Test Login (Demo)'}
        </button>
        {error && <div className="mt-4 text-red-500 text-center font-semibold animate-shake">{error}</div>}
        <div className="mt-6 text-center text-gray-600 dark:text-gray-300">
          Don't have an account?{' '}
          <button className="text-primary font-bold hover:underline" onClick={onSwitch}>Sign Up</button>
        </div>
      </div>
    </div>
  );
}
