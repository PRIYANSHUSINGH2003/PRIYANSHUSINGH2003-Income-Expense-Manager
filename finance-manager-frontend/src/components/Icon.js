import React from 'react';

/**
 * Modern, glassy, neumorphic Icon component for SaaS UI
 * Usage: <Icon name="dashboard" size={28} color="#6366f1" />
 */
const icons = {
  dashboard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="url(#dashboardStroke)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <defs>
        <linearGradient id="dashboardFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="50%" stopColor="#a5b4fc" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id="dashboardStroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <filter id="dashboardShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#6366f1" floodOpacity="0.18" />
        </filter>
      </defs>
      <rect x="3" y="3" width="8" height="10" rx="3" fill="url(#dashboardFill)" filter="url(#dashboardShadow)" />
      <rect x="3" y="17" width="8" height="4" rx="2" fill="url(#dashboardFill)" filter="url(#dashboardShadow)" />
      <rect x="13" y="11" width="8" height="10" rx="3" fill="url(#dashboardFill)" filter="url(#dashboardShadow)" />
      <rect x="13" y="3" width="8" height="6" rx="2" fill="url(#dashboardFill)" filter="url(#dashboardShadow)" />
    </svg>
  ),
  stock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="url(#stockStroke)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <defs>
        <linearGradient id="stockFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="50%" stopColor="#a7f3d0" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
        <linearGradient id="stockStroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
        <filter id="stockShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#22d3ee" floodOpacity="0.15" />
        </filter>
      </defs>
      <rect x="3" y="7" width="18" height="10" rx="4" fill="url(#stockFill)" filter="url(#stockShadow)" />
      <rect x="7" y="3" width="10" height="4" rx="2" fill="url(#stockFill)" filter="url(#stockShadow)" />
      <rect x="7" y="17" width="10" height="4" rx="2" fill="url(#stockFill)" filter="url(#stockShadow)" />
      <ellipse cx="12" cy="12" rx="2.5" ry="2" fill="#fff" fillOpacity="0.18" />
    </svg>
  ),
  wallet: (
    <svg viewBox="0 0 24 24" fill="none" stroke="url(#walletStroke)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <defs>
        <linearGradient id="walletFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="50%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
        <linearGradient id="walletStroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
        <filter id="walletShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#fbbf24" floodOpacity="0.15" />
        </filter>
      </defs>
      <rect x="3" y="7" width="18" height="10" rx="4" fill="url(#walletFill)" filter="url(#walletShadow)" />
      <rect x="7" y="11" width="6" height="2" rx="1" fill="#fff" fillOpacity="0.7" />
      <circle cx="17" cy="12" r="1.5" fill="#fff" fillOpacity="0.7" />
      <ellipse cx="12" cy="12" rx="2.5" ry="2" fill="#fff" fillOpacity="0.12" />
    </svg>
  ),
  invoice: (
    <svg viewBox="0 0 24 24" fill="none" stroke="url(#invoiceStroke)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <defs>
        <linearGradient id="invoiceFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="50%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
        <linearGradient id="invoiceStroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
        <filter id="invoiceShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#fbbf24" floodOpacity="0.13" />
        </filter>
      </defs>
      <rect x="5" y="3" width="14" height="18" rx="4" fill="url(#invoiceFill)" filter="url(#invoiceShadow)" />
      <rect x="8" y="7" width="8" height="2" rx="1" fill="#fff" fillOpacity="0.8" />
      <rect x="8" y="11" width="8" height="2" rx="1" fill="#fff" fillOpacity="0.8" />
      <rect x="8" y="15" width="5" height="2" rx="1" fill="#fff" fillOpacity="0.8" />
      <ellipse cx="12" cy="8" rx="1.5" ry="1" fill="#fff" fillOpacity="0.13" />
    </svg>
  ),
  report: (
    <svg viewBox="0 0 24 24" fill="none" stroke="url(#reportStroke)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <defs>
        <linearGradient id="reportFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="50%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
        <linearGradient id="reportStroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
        <filter id="reportShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#06b6d4" floodOpacity="0.13" />
        </filter>
      </defs>
      <rect x="3" y="4" width="18" height="16" rx="3" fill="url(#reportFill)" filter="url(#reportShadow)" />
      <rect x="7" y="12" width="2" height="4" rx="1" fill="#fff" fillOpacity="0.8" />
      <rect x="12" y="8" width="2" height="8" rx="1" fill="#fff" fillOpacity="0.8" />
      <rect x="17" y="10" width="2" height="6" rx="1" fill="#fff" fillOpacity="0.8" />
      <ellipse cx="12" cy="12" rx="2.5" ry="2" fill="#fff" fillOpacity="0.10" />
    </svg>
  ),
  settings: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <defs>
        <radialGradient id="settingsGradient" cx="50%" cy="50%" r="80%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#6366f1" />
        </radialGradient>
        <filter id="settingsShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#6366f1" floodOpacity="0.13" />
        </filter>
      </defs>
      <circle cx="12" cy="12" r="3" fill="url(#settingsGradient)" filter="url(#settingsShadow)" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33h.09A1.65 1.65 0 008.09 3H9a2 2 0 014 0v.09a1.65 1.65 0 001 1.51h.09a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v.09c.2.63.77 1.09 1.51 1.09H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" fill="url(#settingsGradient)" filter="url(#settingsShadow)" />
    </svg>
  ),
};

export default function Icon({ name, size = 24, color, style = {}, className = '', ...props }) {
  const icon = icons[name];
  if (!icon) return null;
  return (
    <span
      className={`inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size, color, ...style }}
      role="img"
      aria-label={name}
      {...props}
    >
      {React.cloneElement(icon, { width: size, height: size, style: { color } })}
    </span>
  );
}
