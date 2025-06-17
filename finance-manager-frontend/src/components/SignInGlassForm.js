import React, { useState } from 'react';

export default function SignInGlassForm({ onSignIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setError('');
    if (onSignIn) onSignIn({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-app">
      <form
        className="w-full max-w-md bg-glass shadow-glass backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700 flex flex-col gap-6 animate-fade-in"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-extrabold text-center text-primary mb-2 drop-shadow">Sign In</h2>
        <div className="flex flex-col gap-2">
          <label className="text-main font-semibold" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="px-4 py-3 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary outline-none font-medium text-main placeholder-gray-400 dark:placeholder-gray-500 transition-all"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-main font-semibold" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="px-4 py-3 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary outline-none font-medium text-main placeholder-gray-400 dark:placeholder-gray-500 transition-all"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>
        {error && <div className="text-red-500 text-center font-semibold animate-shake">{error}</div>}
        <button
          type="submit"
          className="mt-2 py-3 rounded-xl bg-primary hover:bg-accent transition-all font-bold text-primary-foreground shadow-glass focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
