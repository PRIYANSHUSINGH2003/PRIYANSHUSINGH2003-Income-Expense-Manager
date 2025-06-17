// src/DesignSystem.js
// Centralized design system for enterprise-grade UI/UX
import React, { createContext, useContext, useEffect, useState } from 'react';

// Color palette and gradients (should match tailwind.config.js)
export const colors = {
  primary: '#1976d2',
  primaryLight: '#42a5f5',
  primaryDark: '#1565c0',
  accent: '#f50057',
  success: '#4caf50',
  warning: '#ff9800',
  danger: '#f44336',
  glass: 'rgba(255,255,255,0.6)',
  glassDark: 'rgba(30,41,59,0.6)',
  gradientGlass: 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(66,165,245,0.15) 100%)',
  gradientDark: 'linear-gradient(135deg, #1e293b 0%, #1976d2 100%)',
};

// Glassmorphism/Neumorphism utility classes (for reference)
export const glassClass = 'bg-glass shadow-glass backdrop-blur-xl';
export const glassDarkClass = 'bg-glassDark shadow-glass backdrop-blur-xl';
export const neuClass = 'shadow-neu';
export const cardShadow = 'card-shadow';
export const transitionTheme = 'transition-theme';

// Animation helpers
export const animatedHover = 'transition-all duration-200 hover:scale-105 hover:shadow-lg';
export const animatedButton = 'transition-all duration-200 hover:bg-primary/90 active:scale-95';

// Typography hierarchy components
export function Heading1({ children, className = '', ...props }) {
  return <h1 className={`heading-1 ${className}`} {...props}>{children}</h1>;
}
export function Heading2({ children, className = '', ...props }) {
  return <h2 className={`heading-2 ${className}`} {...props}>{children}</h2>;
}
export function Heading3({ children, className = '', ...props }) {
  return <h3 className={`heading-3 ${className}`} {...props}>{children}</h3>;
}

// Responsive layout helpers
export const containerClass = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';
export const sectionClass = 'my-8 md:my-12';

// Custom iconography (Heroicons style, extend as needed)
export const Icons = {
  dashboard: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8v-10h-8v10zm0-18v6h8V3h-8z" /></svg>
  ),
  stock: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7v4a1 1 0 001 1h3m10 0h3a1 1 0 001-1V7m-1-4H5a2 2 0 00-2 2v16a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z" /></svg>
  ),
  wallet: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a5 5 0 00-10 0v2a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2z" /></svg>
  ),
  invoice: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 4h6a2 2 0 002-2v-6a2 2 0 00-2-2h-6a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>
  ),
  // Add more icons as needed
};

// Theme context for adaptive color modes
const ThemeContext = createContext();
export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);
  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
export function useTheme() {
  return useContext(ThemeContext);
}

// Example: Animated card wrapper
export function GlassCard({ children, className = '', ...props }) {
  return (
    <div className={`bg-glass dark:bg-glassDark card-shadow rounded-2xl p-6 ${transitionTheme} ${className}`} {...props}>
      {children}
    </div>
  );
}

// Example: Animated button
export function AnimatedButton({ children, className = '', ...props }) {
  return (
    <button className={`px-6 py-2 rounded-xl font-bold text-white bg-primary ${animatedButton} shadow-glass ${className}`} {...props}>
      {children}
    </button>
  );
}
