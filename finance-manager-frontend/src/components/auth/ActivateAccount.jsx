import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Spinner = () => (
  <svg className="animate-spin h-8 w-8 text-primary mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
  </svg>
);

const SuccessIcon = () => (
  <svg className="h-16 w-16 text-green-500 mx-auto mb-4 animate-bounceIn" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="#d1fae5" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2l4-4" />
  </svg>
);

const ErrorIcon = () => (
  <svg className="h-16 w-16 text-red-500 mx-auto mb-4 animate-shake" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="#fee2e2" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 9l-6 6m0-6l6 6" />
  </svg>
);

export default function ActivateAccount() {
  const query = useQuery();
  const navigate = useNavigate();
  const [status, setStatus] = useState('pending');
  const [message, setMessage] = useState('Activating your account...');

  useEffect(() => {
    const token = query.get('token');
    if (!token) {
      setStatus('error');
      setMessage('Activation token missing.');
      return;
    }
    fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/activate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    })
      .then(async res => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Activation failed');
        setStatus('success');
        setMessage('Your account has been activated! You can now log in.');
        setTimeout(() => navigate('/'), 3500);
      })
      .catch(err => {
        setStatus('error');
        setMessage(err.message || 'Activation failed');
      });
  }, [query, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-accent/10 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-md p-8 rounded-3xl shadow-2xl bg-white/90 dark:bg-gray-900/90 border border-primary/10 dark:border-accent/10 backdrop-blur-xl animate-fade-in">
        <div className="flex flex-col items-center">
          {status === 'pending' && <Spinner />}
          {status === 'success' && <SuccessIcon />}
          {status === 'error' && <ErrorIcon />}
          <h2 className={`text-3xl font-extrabold mb-2 text-center drop-shadow ${status === 'success' ? 'text-green-600' : status === 'error' ? 'text-red-600' : 'text-primary dark:text-accent'}`}>Account Activation</h2>
          <p className="text-lg text-gray-700 dark:text-gray-200 text-center mb-4 font-medium animate-fade-in-slow">{message}</p>
          {status === 'success' && <p className="text-green-700 dark:text-green-400 text-center font-semibold animate-fade-in">Redirecting to login...</p>}
          {status === 'error' && <button className="mt-6 px-6 py-2 bg-primary text-white rounded-xl font-bold shadow hover:bg-accent transition-all duration-200" onClick={() => navigate('/')}>Go to Home</button>}
        </div>
      </div>
      <style>{`
        @keyframes bounceIn {
          0% { transform: scale(0.5); opacity: 0; }
          60% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); }
        }
        .animate-bounceIn { animation: bounceIn 0.7s cubic-bezier(.68,-0.55,.27,1.55) both; }
        @keyframes shake {
          10%, 90% { transform: translateX(-1px); }
          20%, 80% { transform: translateX(2px); }
          30%, 50%, 70% { transform: translateX(-4px); }
          40%, 60% { transform: translateX(4px); }
        }
        .animate-shake { animation: shake 0.7s cubic-bezier(.36,.07,.19,.97) both; }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.7s ease-in both; }
        @keyframes fade-in-slow {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in-slow { animation: fade-in-slow 1.5s ease-in both; }
      `}</style>
    </div>
  );
}
