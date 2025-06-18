import React from 'react';

const stats = [
  {
    label: 'Total Income',
    value: '₹1,20,000',
    icon: (
      <svg className="w-8 h-8" style={{ color: 'var(--color-accent)' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m0 0l-3-3m3 3l3-3m-9 4a9 9 0 1118 0 9 9 0 01-18 0z" /></svg>
    ),
    bg: 'stat-income',
  },
  {
    label: 'Total Expense',
    value: '₹80,000',
    icon: (
      <svg className="w-8 h-8" style={{ color: 'var(--color-primary)' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 16V8m0 0l3 3m-3-3l-3 3m9-4a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
    bg: 'stat-expense',
  },
  {
    label: 'Net Profit',
    value: '₹40,000',
    icon: (
      <svg className="w-8 h-8" style={{ color: 'var(--color-accent)' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m0 0l-3-3m3 3l3-3m-9 4a9 9 0 1118 0 9 9 0 01-18 0z" /></svg>
    ),
    bg: 'stat-profit',
  },
  {
    label: 'Invoices Paid',
    value: '23',
    icon: (
      <svg className="w-8 h-8" style={{ color: 'var(--color-primary)' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 4h6a2 2 0 002-2v-6a2 2 0 00-2-2h-6a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>
    ),
    bg: 'stat-invoice',
  },
];

export default function Reports() {
  return (
    <div className="relative max-w-5xl mx-auto mt-12 p-0">
      {/* Glassmorphism Card with Theme Colors */}
      <div
        className="relative rounded-3xl overflow-hidden shadow-2xl border animate-fade-in"
        style={{
          background: 'var(--color-bg-glass)',
          border: '1.5px solid var(--color-primary)',
          backdropFilter: 'blur(32px) saturate(180%)',
          WebkitBackdropFilter: 'blur(32px) saturate(180%)',
        }}
      >
        {/* Animated Border */}
        <div className="absolute -inset-1.5 rounded-3xl pointer-events-none z-0 animate-gradient-x"
          style={{
            background: 'linear-gradient(90deg, var(--color-primary) 0%, var(--color-accent) 100%)',
            opacity: 0.18,
            filter: 'blur(18px)',
          }}
        />
        <div className="relative z-10 p-10 md:p-14">
          <h2 className="text-4xl font-extrabold mb-8 text-primary dark:text-accent text-center drop-shadow">Reports & Analytics</h2>
          <p className="mb-10 text-lg text-main dark:text-main text-center">Get a quick overview of your financial health, trends, and key metrics.</p>
          {/* Stat Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7 mb-12">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`rounded-2xl p-6 flex flex-col items-center shadow-lg ${stat.bg} border border-white/20 dark:border-gray-800/40 backdrop-blur-xl hover:scale-105 transition-transform duration-300`}
                style={{
                  background: 'var(--color-bg-surface)',
                  color: 'var(--color-text-main)',
                }}
              >
                <div className="mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-main dark:text-main mb-1">{stat.value}</div>
                <div className="text-sm text-muted dark:text-muted font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
          {/* Trends/Analytics Section */}
          <div className="rounded-2xl shadow-xl p-8 border border-primary/10 dark:border-accent/10 backdrop-blur-xl"
            style={{
              background: 'var(--color-bg-surface)',
              color: 'var(--color-text-main)',
            }}
          >
            <h3 className="text-xl font-bold mb-4 text-primary dark:text-accent">Trends & Insights</h3>
            <ul className="list-disc pl-8 text-main dark:text-main text-lg space-y-3">
              <li>Monthly Income &amp; Expense Summary</li>
              <li>Stock Performance Overview</li>
              <li>Invoice Payment Trends</li>
              <li>Custom Financial Reports</li>
            </ul>
            <div className="mt-6 text-center text-muted dark:text-muted text-sm">(Charts and analytics coming soon!)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
