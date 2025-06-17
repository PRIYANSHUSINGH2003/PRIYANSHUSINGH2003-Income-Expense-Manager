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

// --- Modern SaaS Header Components ---
import SearchInput from './components/SearchInput';
import NotificationBell from './components/NotificationBell';
import UserMenu from './components/UserMenu';
import ThemeToggle from './components/ThemeToggle';
// -------------------------------------

// Icon SVGs for custom iconography
const icons = {
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
    const response = await axios.get('http://localhost:5000/stock');
    setStock(response.data.stocks);
    setNetProfitStock(response.data.netProfitStock);
  };

  const fetchIncomeExpense = async () => {
    const response = await axios.get('http://localhost:5000/income-expense');
    setIncomeExpense(response.data.entries);
    setNetProfit(response.data.netProfit);
  };

  const addStock = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/stock', stockForm);
    setStockForm({ type: '', vendor: '', amount: '' });
    fetchStock();
    setSnackbar({ open: true, message: 'Stock added successfully!', severity: 'success' });
  };

  const addEntry = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/income-expense', entryForm);
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
  { key: 'reports', label: 'Reports', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 4h6a2 2 0 002-2v-6a2 2 0 00-2-2h-6a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>
    ) },
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
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-base transition-all duration-200 hover:bg-primary/10 dark:hover:bg-primary/20 focus:outline-none ${selectedSection === link.key ? 'bg-primary text-primary shadow-lg' : 'text-gray-700 dark:text-gray-200'}`}
                  onClick={() => handleSectionChange(link.key)}
                >
                  <span>{React.cloneElement(link.icon, { className: 'w-6 h-6 text-primary dark:text-accent' })}</span>
                  <span className="text-gray-800 dark:text-gray-200">{link.label}</span>
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
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 max-w-lg mx-auto mt-8">
                <h2 className="text-2xl font-bold mb-4">Settings</h2>
                <p>Settings functionality coming soon.</p>
                <button className="mt-6 px-4 py-2 bg-primary text-white rounded" onClick={() => setSelectedSection('dashboard')}>Back to Dashboard</button>
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
    // TODO: Send formData to backend via axios
    setProfile({ ...profile, ...updated, onlineProfile: updated.onlineProfile || onlineProfile });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
    setModalOpen(false);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-3xl shadow-2xl p-10 max-w-xl mx-auto mt-10 border border-primary/10">
      <h2 className="text-3xl font-extrabold mb-6 text-primary dark:text-accent text-center flex items-center justify-center gap-2">
        <svg className="w-8 h-8 text-primary dark:text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        Profile
      </h2>
      <div className="flex flex-col items-center mb-6 relative">
      <div className="relative group">
      <Avatar src={imagePreview} alt={profile.username} size={110} />
      <label className="absolute bottom-0 right-0 bg-primary dark:bg-accent text-white rounded-full p-2 shadow-lg cursor-pointer group-hover:scale-110 transition-transform border-2 border-white dark:border-gray-900">
      <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828L18 9.828M7 7h.01" /></svg>
      </label>
      </div>
      <div className="mt-2 text-gray-500 dark:text-gray-400 text-sm">Click the camera to change your photo</div>
      </div>
      <div className="space-y-3 mb-6">
      <div className="flex items-center gap-2">
      <svg className="w-5 h-5 text-primary dark:text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
      <span className="font-semibold text-gray-700 dark:text-gray-200">Username:</span>
      <span className="text-gray-800 dark:text-gray-200">{profile.username}</span>
      </div>
      <div className="flex items-center gap-2">
      <svg className="w-5 h-5 text-primary dark:text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
      <span className="font-semibold text-gray-700 dark:text-gray-200">Email:</span>
      <span className="text-gray-800 dark:text-gray-200">{profile.email || 'N/A'}</span>
      </div>
      <div className="flex items-center gap-2">
      <svg className="w-5 h-5 text-primary dark:text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
      <span className="font-semibold text-gray-700 dark:text-gray-200">Online Profile:</span>
      {onlineProfile ? <a href={onlineProfile} className="text-blue-600 dark:text-blue-300 underline" target="_blank" rel="noopener noreferrer">{onlineProfile}</a> : <span className="text-gray-800 dark:text-gray-200">N/A</span>}
      </div>
      </div>
      <div className="flex gap-2 mt-8 justify-center">
        <button className="px-6 py-2 bg-primary text-white rounded-xl font-bold shadow hover:bg-primary/90 transition" onClick={() => setModalOpen(true)}>
          <svg className="w-5 h-5 inline-block mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          Edit Profile
        </button>
        <button className="px-6 py-2 bg-gray-400 text-white rounded-xl font-bold shadow hover:bg-gray-500 transition" onClick={onBack}>Back to Dashboard</button>
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
    </AuthProvider>
  );
}