import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthProvider, useAuth } from './AuthContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import DashboardHome from './dashboard/DashboardHome';
import Dashboard from './components/dashboard/Dashboard';
import Stock from './components/dashboard/Stock';
import IncomeExpense from './components/incomeExpense/IncomeExpense';
import Invoices from './components/invoices/Invoices';
import LandingPage from './pages/LandingPage.jsx';
import ProfileUpdateModal from './components/ProfileUpdateModal';
import Avatar from './components/Avatar';
import Reports from './pages/Reports';
import DraggableDevInfo from './components/DraggableDevInfo';

// --- Modern SaaS Header Components ---
import SearchInput from './components/SearchInput';
import NotificationBell from './components/NotificationBell';
import UserMenu from './components/UserMenu';
import ThemeToggle from './components/ThemeToggle';
// -------------------------------------

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Icon SVGs for custom iconography
const icons = {
  dashboard: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="dashboardFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="50%" stopColor="#a5b4fc" />
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
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="stockFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="50%" stopColor="#a7f3d0" />
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
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="walletFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="50%" stopColor="#fde68a" />
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
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="invoiceFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="50%" stopColor="#fbbf24" />
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
    <svg className="w-6 h-6 icon-theme icon-interactive" viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="reportFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="50%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#6366f1" />
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
};

const drawerWidth = 240;

function MainApp() {
const [stock, setStock] = useState([]);
const [incomeExpense, setIncomeExpense] = useState([]);
const [netProfitStock, setNetProfitStock] = useState(0);
const [netProfit, setNetProfit] = useState(0);

const [stockForm, setStockForm] = useState({ type: '', vendor: '', amount: '' });
const [entryForm, setEntryForm] = useState({ category: '', amount: '', type: '' });

const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
const [mobileOpen, setMobileOpen] = useState(false);
const [selectedSection, setSelectedSection] = useState('dashboard');
const [darkMode, setDarkMode] = useState(() => {
// System preference detection
if (typeof window !== 'undefined') {
return localStorage.getItem('theme') === 'dark' || 
(!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
}
return false;
});
const [language, setLanguage] = useState(() => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('language') || 'en';
  }
  return 'en';
});

  useEffect(() => {
    fetchStock();
    fetchIncomeExpense();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const fetchStock = async () => {
    const response = await axios.get(`${API_BASE_URL}/stock`);
    setStock(response.data.stocks);
    setNetProfitStock(response.data.netProfitStock);
  };

  const fetchIncomeExpense = async () => {
    const response = await axios.get(`${API_BASE_URL}/income-expense`);
    setIncomeExpense(response.data.entries);
    setNetProfit(response.data.netProfit);
  };

  const addStock = async (e) => {
    e.preventDefault();
    await axios.post(`${API_BASE_URL}/stock`, stockForm);
    setStockForm({ type: '', vendor: '', amount: '' });
    fetchStock();
    setSnackbar({ open: true, message: 'Stock added successfully!', severity: 'success' });
  };

  const addEntry = async (e) => {
    e.preventDefault();
    await axios.post(`${API_BASE_URL}/income-expense`, entryForm);
    setEntryForm({ category: '', amount: '', type: '' });
    fetchIncomeExpense();
    setSnackbar({ open: true, message: 'Entry added successfully!', severity: 'success' });
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSectionChange = (section) => {
    setSelectedSection(section);
    setMobileOpen(false);
  };

  // Sidebar links
  const navLinks = [
    { key: 'dashboard', label: 'Dashboard', icon: icons.dashboard },
    { key: 'stock', label: 'Stock', icon: icons.stock },
    { key: 'income-expense', label: 'Income & Expense', icon: icons.wallet },
    { key: 'invoices', label: 'Invoices', icon: icons.invoice },
  { key: 'reports', label: 'Reports', icon: icons.report },
  ];

  const { user, loading, logout } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  if (loading) return null;
  if (!user) {
    // Show LandingPage by default, with options to show Login/Register
    if (showRegister) {
      return <Register onSwitch={() => setShowRegister(false)} />;
    }
    if (showRegister === false && showRegister !== null) {
      return <Login onSwitch={() => setShowRegister(true)} />;
    }
    // Show new LandingPage with Login/Register buttons
    return (
      <LandingPage
        onLogin={() => setShowRegister(false)}
        onRegister={() => setShowRegister(true)}
      />
    );
  }

  // ... (rest of your dashboard code)
  // Only show admin-only links if user is admin
  const filteredNavLinks = user.role === 'admin'
    ? navLinks
    : navLinks.filter(link => link.key !== 'stock'); // Example: 'stock' is admin-only

  return (
    <div className="min-h-screen flex flex-col bg-gradient-glass dark:bg-gradient-dark transition-colors duration-500">
      {/* Modern SaaS Header */}
      <header className="flex items-center justify-between gap-4 px-6 py-4 bg-glass dark:bg-glassDark shadow-glass backdrop-blur-xl sticky top-0 z-40 rounded-b-3xl border-b border-white/20 dark:border-gray-700">
        <div className="flex items-center gap-4 flex-1">
          <span className="font-heading text-2xl font-extrabold tracking-wide text-primary dark:text-accent drop-shadow">Finance Manager</span>
          <SearchInput value={''} onChange={() => {}} className="max-w-xs" />
        </div>
        <div className="flex items-center gap-4">
          <NotificationBell notifications={['Budget limit reached!', 'New invoice paid']} />
          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          <UserMenu
            user={user}
            onLogout={logout}
            onProfile={() => setSelectedSection('profile')}
            onSettings={() => setSelectedSection('settings')}
          />
        </div>
      </header>
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col justify-between w-60 p-4 bg-glass dark:bg-glassDark shadow-glass dark:shadow-lg backdrop-blur-xl rounded-r-3xl transition-all duration-500 border-r border-white/20 dark:border-gray-700">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 flex items-center justify-center rounded-2xl bg-transparent dark:bg-accent text-white shadow-neu">
                {React.cloneElement(icons.dashboard, { className: 'w-6 h-6 text-primary dark:text-accent' })}
              </div>
              <span className="font-heading text-xl font-extrabold tracking-wide text-primary dark:text-accent">Finance Manager</span>
            </div>
            <nav className="flex flex-col gap-2">
              {filteredNavLinks.map(link => (
                <button
                  key={link.key}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-base transition-all duration-200 hover:bg-primary/10 dark:hover:bg-primary/20 focus:outline-none ${selectedSection === link.key ? 'text-primary shadow-lg bg-glass ' : 'text-gray-700 dark:text-gray-200'}`}
                  onClick={() => handleSectionChange(link.key)}
                >
                  <span>{React.cloneElement(link.icon, { className: 'w-6 h-6 text-text-main dark:text-accent' })}</span>
                  <span className={`${selectedSection === link.key ? 'text-primary' : 'text-text-main'}`}>{link.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>
        {/* Main Content Area */}
        <main className="flex-1 flex flex-col p-4 md:p-8 overflow-y-auto">
          <div className="max-w-7xl w-full mx-auto">
            {selectedSection === 'dashboard' && <DashboardHome />}
            {selectedSection === 'stock' && (
              <Stock
                stock={stock}
                netProfitStock={netProfitStock}
                stockForm={stockForm}
                setStockForm={setStockForm}
                addStock={addStock}
              />
            )}
            {selectedSection === 'income-expense' && (
              <IncomeExpense
                incomeExpense={incomeExpense}
                netProfit={netProfit}
                entryForm={entryForm}
                setEntryForm={setEntryForm}
                addEntry={addEntry}
              />
            )}
            {selectedSection === 'invoices' && <Invoices />}
            {selectedSection === 'profile' && (
              <ProfileSection user={user} onBack={() => setSelectedSection('dashboard')} />
            )}
            {selectedSection === 'reports' && <Reports />}
            {selectedSection === 'settings' && (
              <div className="bg-white/80 dark:bg-gray-900/90 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-3xl shadow-2xl p-10 max-w-xl mx-auto mt-10 border border-primary/10 backdrop-blur-xl animate-fade-in">
                <h2 className="text-3xl font-extrabold mb-8 text-primary dark:text-accent text-center flex items-center justify-center gap-3 drop-shadow">
                  <svg className="w-7 h-7 text-gray-400 dark:text-gray-500 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-label="Gear"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33h.09A1.65 1.65 0 008.09 3H9a2 2 0 014 0v.09a1.65 1.65 0 001 1.51h.09a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v.09c.2.63.77 1.09 1.51 1.09H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg>
                  Settings
                </h2>
                <div className="space-y-6">
                  {/* Theme Toggle */}
                  <div className="flex items-center justify-between bg-white/60 dark:bg-gray-800/60 rounded-xl px-5 py-4 shadow border border-primary/10 dark:border-accent/10 transition-all duration-300 hover:shadow-xl">
                    <div className="flex items-center gap-3">
                      <svg className="w-6 h-6 text-primary dark:text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-label="Theme"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.93l-.71-.71" /></svg>
                      <span className="font-semibold text-gray-700 dark:text-gray-200">Dark Mode</span>
                    </div>
                    <label className="inline-flex items-center cursor-pointer group" aria-label="Toggle dark mode">
                      <input type="checkbox" checked={darkMode} onChange={() => {
                        setDarkMode(!darkMode);
                        setSnackbar({ open: true, message: `Dark mode ${!darkMode ? 'enabled' : 'disabled'}`, severity: 'info' });
                      }} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary dark:peer-focus:ring-accent rounded-full peer dark:bg-gray-700 peer-checked:bg-primary dark:peer-checked:bg-accent transition-all duration-300 flex items-center relative">
                        <span className={`absolute left-1 transition-transform duration-500 ${darkMode ? 'translate-x-5 scale-110 rotate-180' : 'translate-x-0 scale-100 rotate-0'}`}>
                          {darkMode ? (
                            <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 2.22a1 1 0 011.42 1.42l-.7.7a1 1 0 11-1.42-1.42l.7-.7zM18 9a1 1 0 100 2h-1a1 1 0 100-2h1zm-2.22 6.78a1 1 0 00-1.42 1.42l.7.7a1 1 0 001.42-1.42l-.7-.7zM10 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-6.22-1.22a1 1 0 00-1.42 1.42l.7.7a1 1 0 001.42-1.42l-.7-.7zM4 11a1 1 0 100-2H3a1 1 0 100 2h1zm2.22-6.78a1 1 0 00-1.42-1.42l-.7.7a1 1 0 101.42 1.42l.7-.7z" /><circle cx="10" cy="10" r="4" /></svg>
                          ) : (
                            <svg className="w-5 h-5 text-gray-600 dark:text-gray-200" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
                          )}
                        </span>
                      </div>
                      <span className="ml-3 text-sm font-medium text-gray-600 dark:text-gray-300">{darkMode ? 'On' : 'Off'}</span>
                    </label>
                  </div>
                  {/* Language Select */}
                  <div className="flex items-center justify-between bg-white/60 dark:bg-gray-800/60 rounded-xl px-5 py-4 shadow border border-primary/10 dark:border-accent/10 transition-all duration-300 hover:shadow-xl">
                    <div className="flex items-center gap-3">
                      <svg className="w-6 h-6 text-primary dark:text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-label="Language"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>
                      <span className="font-semibold text-gray-700 dark:text-gray-200">Language</span>
                    </div>
                    <select
                      className="rounded-lg px-3 py-2 bg-white dark:bg-gray-800 border border-primary/20 dark:border-accent/20 text-gray-700 dark:text-gray-200 focus:outline-none"
                      value={language}
                      onChange={e => {
                        setLanguage(e.target.value);
                        localStorage.setItem('language', e.target.value);
                        setSnackbar({ open: true, message: `Language set to ${e.target.options[e.target.selectedIndex].text}`, severity: 'info' });
                      }}
                      aria-label="Select language"
                    >
                      <option value="en">English</option>
                      <option value="hi">Hindi</option>
                      <option value="es">Spanish</option>
                    </select>
                  </div>
                  {/* Date Format Select */}
                  <div className="flex items-center justify-between bg-white/60 dark:bg-gray-800/60 rounded-xl px-5 py-4 shadow border border-primary/10 dark:border-accent/10 transition-all duration-300 hover:shadow-xl">
                    <div className="flex items-center gap-3">
                      <svg className="w-6 h-6 text-primary dark:text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-label="Date Format"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      <span className="font-semibold text-gray-700 dark:text-gray-200">Date Format</span>
                    </div>
                    <select
                      className="rounded-lg px-3 py-2 bg-white dark:bg-gray-800 border border-primary/20 dark:border-accent/20 text-gray-700 dark:text-gray-200 focus:outline-none"
                      value={localStorage.getItem('dateFormat') || 'MM/DD/YYYY'}
                      onChange={e => {
                        localStorage.setItem('dateFormat', e.target.value);
                        setSnackbar({ open: true, message: `Date format set to ${e.target.value}`, severity: 'info' });
                        // Optionally trigger a rerender or date update here
                      }}
                      aria-label="Select date format"
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 mt-10 justify-center">
                  <button className="px-7 py-2.5 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-bold shadow-lg hover:from-primary/90 hover:to-accent/90 transition-all duration-200 flex items-center gap-2" onClick={() => setSelectedSection('dashboard')}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h4l3-8 4 16 3-8h4" /></svg>
                    Back to Dashboard
                  </button>
                </div>
                {/* Snackbar for feedback */}
                {snackbar.open && (
                  <div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-lg font-semibold text-white transition-all duration-300 ${snackbar.severity === 'info' ? 'bg-primary' : snackbar.severity === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
                    role="alert"
                    aria-live="polite"
                  >
                    {snackbar.message}
                    <button className="ml-4 text-white/80 hover:text-white" onClick={() => setSnackbar({ ...snackbar, open: false })} aria-label="Close notification">&times;</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

// ProfileSection component for profile view/edit
function ProfileSection({ user, onBack }) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [profile, setProfile] = React.useState({ ...user });
  const [imagePreview, setImagePreview] = React.useState(user.avatar || '');
  const [imageFile, setImageFile] = React.useState(null);
  const [onlineProfile, setOnlineProfile] = React.useState(user.onlineProfile || '');
  const [success, setSuccess] = React.useState(false);

  // Handle image file upload
  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Save handler (simulate backend call)
  const handleSave = async updated => {
    // Prepare data for backend (FormData for file upload)
    const formData = new FormData();
    formData.append('username', updated.username);
    formData.append('email', updated.email);
    formData.append('onlineProfile', updated.onlineProfile || onlineProfile);
    if (imageFile) formData.append('avatar', imageFile);
    // Send formData to backend via axios
    try {
      await axios.put(`${API_BASE_URL}/api/profile`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });
      setProfile({ ...profile, ...updated, onlineProfile: updated.onlineProfile || onlineProfile });
      setSuccess(true);
    } catch (err) {
      alert('Failed to update profile.');
    }
    setTimeout(() => setSuccess(false), 2000);
    setModalOpen(false);
  };

  return (
    <div className="bg-white/70 dark:bg-gray-900/80 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-3xl shadow-2xl p-10 max-w-xl mx-auto mt-10 border border-primary/10 backdrop-blur-xl">
      <h2 className="text-3xl font-extrabold mb-8 text-primary dark:text-accent text-center flex items-center justify-center gap-3 drop-shadow">
        <svg className="w-9 h-9 text-primary dark:text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        Profile
      </h2>
      <div className="flex flex-col items-center mb-8 relative">
        <div className="relative group">
          <div className="rounded-full ring-4 ring-primary/40 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 shadow-xl bg-gradient-to-br from-primary/20 to-accent/20 transition-all duration-300 hover:scale-105">
            <Avatar src={imagePreview} alt={profile.username} size={120} />
          </div>
          <label className="absolute bottom-2 right-2 bg-gradient-to-br from-primary to-accent text-white rounded-full p-2 shadow-lg border-2 border-white dark:border-gray-900 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828L18 9.828M7 7h.01" /></svg>
          </label>
        </div>
        <div className="mt-3 text-gray-500 dark:text-gray-400 text-sm">Click the camera to change your photo</div>
      </div>
      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-3 bg-white/60 dark:bg-gray-800/60 rounded-xl px-5 py-3 shadow border border-primary/10 dark:border-accent/10">
          <svg className="w-6 h-6 text-primary dark:text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          <span className="font-semibold text-gray-700 dark:text-gray-200">Username:</span>
          <span className="text-gray-800 dark:text-gray-200">{profile.username}</span>
        </div>
        <div className="flex items-center gap-3 bg-white/60 dark:bg-gray-800/60 rounded-xl px-5 py-3 shadow border border-primary/10 dark:border-accent/10">
          <svg className="w-6 h-6 text-primary dark:text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          <span className="font-semibold text-gray-700 dark:text-gray-200">Email:</span>
          <span className="text-gray-800 dark:text-gray-200">{profile.email || 'N/A'}</span>
        </div>
        <div className="flex items-center gap-3 bg-white/60 dark:bg-gray-800/60 rounded-xl px-5 py-3 shadow border border-primary/10 dark:border-accent/10">
          <svg className="w-6 h-6 text-primary dark:text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          <span className="font-semibold text-gray-700 dark:text-gray-200">Online Profile:</span>
          {onlineProfile ? <a href={onlineProfile} className="text-blue-600 dark:text-blue-300 underline" target="_blank" rel="noopener noreferrer">{onlineProfile}</a> : <span className="text-gray-800 dark:text-gray-200">N/A</span>}
        </div>
      </div>
      <div className="flex gap-3 mt-8 justify-center">
        <button className="px-7 py-2.5 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-bold shadow-lg hover:from-primary/90 hover:to-accent/90 transition-all duration-200 flex items-center gap-2" onClick={() => setModalOpen(true)}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          Edit Profile
        </button>
        <button className="px-7 py-2.5 bg-gray-400 dark:bg-gray-700 text-white rounded-xl font-bold shadow-lg hover:bg-gray-500 dark:hover:bg-gray-600 transition-all duration-200" onClick={onBack}>Back to Dashboard</button>
      </div>
      {success && <div className="mt-6 text-green-600 font-semibold text-center">Profile updated successfully!</div>}
      <ProfileUpdateModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        user={{ ...profile, onlineProfile }}
        onSave={updated => {
          setProfile({ ...profile, ...updated });
          setOnlineProfile(updated.onlineProfile || onlineProfile);
          if (updated.avatar && typeof updated.avatar === 'string') setImagePreview(updated.avatar);
          setModalOpen(false);
          setSuccess(true);
          setTimeout(() => setSuccess(false), 2000);
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
      <DraggableDevInfo />
    </AuthProvider>
  );
}
