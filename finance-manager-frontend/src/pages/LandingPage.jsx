import React, { useContext } from 'react';
import GlassCard from '../components/common/GlassCard';
import CardGrid from '../components/CardGrid';
import Alert from '../common/Alert';
import ProgressBar from '../common/ProgressBar';
import ThemeToggle from '../components/ThemeToggle';
import { GuestAccessContext } from '../context/GuestAccessContext';
import useMediaQuery from '../hooks/useMediaQuery';

const features = [
  {
    title: 'Expense Tracking',
    description: 'Track your spending with beautiful charts and smart categorization.',
    icon: '💸',
  },
  {
    title: 'Smart Bill Generator',
    description: 'Easily split and generate bills for any occasion.',
    icon: '🧾',
  },
  {
    title: 'Invoice Automation',
    description: 'Automate invoice creation, preview, and export for all your needs.',
    icon: '📄',
  },
  {
    title: 'AI-driven Insights',
    description: 'Detect anomalies and optimize spending with AI tools.',
    icon: '🤖',
  },
];

const LandingPage = () => {
  const { guestUses, maxGuestUses } = useContext(GuestAccessContext);
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header & Theme Toggle */}
      <header className="flex justify-between items-center p-6">
        <h1 className="text-3xl font-extrabold text-indigo-700 dark:text-white tracking-tight">Finance Manager</h1>
        <ThemeToggle />
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center py-12 px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-400">Take Control of Your Finances</h2>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
          A modern, intelligent platform for tracking expenses, generating invoices, and discovering smart financial tools. Designed for both personal and professional use.
        </p>
        <a href="#features" className="inline-block px-8 py-3 rounded-full bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition">Get Started Free</a>
      </section>

      {/* Features Highlight Grid */}
      <section id="features" className="py-10 px-4 max-w-5xl mx-auto w-full">
        <h3 className="text-2xl font-bold text-center mb-8 text-indigo-700 dark:text-white">Platform Highlights</h3>
        <CardGrid>
          {features.map((feature, idx) => (
            <GlassCard key={idx} className="flex flex-col items-center p-6">
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </GlassCard>
          ))}
        </CardGrid>
      </section>

      {/* Guest Access Notice */}
      <section className="py-8 px-4 max-w-xl mx-auto w-full">
        <Alert type={guestUses < maxGuestUses ? 'info' : 'warning'}>
          {guestUses < maxGuestUses ? (
            <>
              <span>You are using guest access. Try out up to <b>{maxGuestUses}</b> free tools! ({maxGuestUses - guestUses} left)</span>
              <ProgressBar value={(guestUses / maxGuestUses) * 100} className="mt-2" />
            </>
          ) : (
            <>
              <span>You've reached the guest usage limit. <a href="/login" className="text-indigo-600 underline">Login</a> or <a href="/register" className="text-indigo-600 underline">Sign up</a> for unlimited access!</span>
              <ProgressBar value={100} className="mt-2" />
            </>
          )}
        </Alert>
      </section>

      {/* Contact & Footer */}
      <footer className="mt-auto py-6 px-4 bg-white/60 dark:bg-gray-900/60 backdrop-blur shadow-inner">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-5xl mx-auto">
          <div className="mb-2 md:mb-0 text-gray-700 dark:text-gray-300">
            &copy; {new Date().getFullYear()} Finance Manager. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <a href="/docs" className="text-indigo-600 hover:underline">Documentation</a>
            <a href="/faq" className="text-indigo-600 hover:underline">FAQ</a>
            <a href="mailto:support@financemanager.com" className="text-indigo-600 hover:underline">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
