import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import GlassCard from '../components/GlassCard';
import AnimatedButton from '../components/AnimatedButton';
import SectionTitle from '../components/SectionTitle';
import Icon from '../components/Icon';
import Badge from '../components/Badge';
import Avatar from '../components/Avatar';
import Notification from '../common/Notification';
import Alert from '../common/Alert';
import { Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import CreateEntryModal from '../components/CreateEntryModal';
import IncomeExpense from '../components/incomeExpense/IncomeExpense';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
function getProfileImageUrl(profileImage) {
  return profileImage && !profileImage.startsWith('http')
    ? `${API_BASE_URL}${profileImage}`
    : profileImage;
}

export default function DashboardHome() {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState('All');
  const [showNotif, setShowNotif] = useState(false);
  const [showAddEntry, setShowAddEntry] = useState(false);
  const [incomeExpense, setIncomeExpense] = useState([]);
  const [netProfit, setNetProfit] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch user's income/expense data
  const fetchIncomeExpense = async () => {
    if (!user || !(user._id || user.username)) return;
    setLoading(true);
    try {
      const userId = user._id || user.username;
      const response = await fetch(`${API_BASE_URL}/income-expense?userId=${userId}`);
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      setIncomeExpense(data.entries || []);
      setNetProfit(data.netProfit || 0);
    } catch (err) {
      setIncomeExpense([]);
      setNetProfit(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomeExpense();
    // eslint-disable-next-line
  }, [user]);

  // Categories from data
  const categories = ['All', ...Array.from(new Set(incomeExpense.map(e => e.category).filter(Boolean)))];

  // Pie chart data from user's entries
  const pieLabels = Array.from(new Set(incomeExpense.map(e => e.category).filter(Boolean)));
  const pieAmounts = pieLabels.map(cat => incomeExpense.filter(e => e.category === cat && e.type === 'expense').reduce((sum, e) => sum + Number(e.amount), 0));
  const pieData = {
    labels: pieLabels,
    datasets: [
      {
        data: pieAmounts,
        backgroundColor: ['#42a5f5', '#f50057', '#4caf50', '#ff9800', '#a78bfa', '#fbbf24', '#10b981', '#6366f1'],
        borderWidth: 2,
      },
    ],
  };

  // Bar chart data for weekly trends (dummy, can be improved)
  const barData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Income',
        data: [0, 0, 0, 0],
        backgroundColor: '#1976d2',
      },
      {
        label: 'Expenses',
        data: [0, 0, 0, 0],
        backgroundColor: '#f50057',
      },
    ],
  };

  // Summary data
  const totalIncome = incomeExpense.filter(e => e.type === 'income').reduce((sum, e) => sum + Number(e.amount), 0);
  const totalExpenses = incomeExpense.filter(e => e.type === 'expense').reduce((sum, e) => sum + Number(e.amount), 0);
  const summaryData = [
    { label: 'Income', value: totalIncome, icon: 'wallet', color: 'from-green-400 to-blue-400', trend: 'up', trendValue: '' },
    { label: 'Expenses', value: totalExpenses, icon: 'invoice', color: 'from-red-400 to-pink-400', trend: 'down', trendValue: '' },
    { label: 'Savings', value: totalIncome - totalExpenses, icon: 'dashboard', color: 'from-blue-400 to-purple-400', trend: (totalIncome - totalExpenses) >= 0 ? 'up' : 'down', trendValue: '' },
  ];

  // Filtered pie data by category
  const filteredPieData = activeCategory === 'All'
    ? pieData
    : {
        ...pieData,
        datasets: [
          {
            ...pieData.datasets[0],
            data: pieData.labels.map((l, i) => (l === activeCategory ? pieData.datasets[0].data[i] : 0)),
          },
        ],
      };

  return (
    <div className="min-h-screen bg-gradient-glass dark:bg-gradient-dark transition-theme py-8 px-2 md:px-8 lg:px-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <Avatar src={getProfileImageUrl(user?.profileImage)} alt={user?.username} status="online" size={56} />
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold font-heading text-primary dark:text-white mb-1">Welcome back{user?.username ? `, ${user.username}!` : '!'}</h1>
            <div className="text-gray-500 dark:text-gray-300 text-sm">Here's your financial overview for this month.</div>
          </div>
        </div>
        <div className="flex gap-3">
          <AnimatedButton onClick={() => setShowNotif(true)}>Show Alert</AnimatedButton>
          <AnimatedButton onClick={() => setShowAddEntry(true)}>+ Add Entry</AnimatedButton>
        </div>
      </div>
      {/* Add Entry Modal */}
      <CreateEntryModal
        open={showAddEntry}
        onClose={() => setShowAddEntry(false)}
        onCreate={async entry => {
          if (!user || !(user._id || user.username)) {
            alert('User not authenticated.');
            return;
          }
          try {
            const response = await fetch(`${API_BASE_URL}/income-expense`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
              body: JSON.stringify({ ...entry, userId: user._id || user.username }),
            });
            if (!response.ok) throw new Error('Failed to save entry');
            await fetchIncomeExpense();
            alert('Entry created and saved!');
            setShowAddEntry(false);
          } catch (err) {
            alert('Failed to save entry.');
          }
        }}
      />
      {/* Notification/Alert */}
      {showNotif && (
        <Notification message="Budget limit reached!" type="warning" onClose={() => setShowNotif(false)} />
      )}
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {summaryData.map((item, idx) => (
          <GlassCard
            key={item.label}
            className={`relative flex flex-col items-center py-7 px-6 bg-gradient-to-br ${item.color} animate-fade-in-up delay-${idx * 100} hover:scale-105 hover:shadow-xl transition-transform duration-300`}
          >
            <div className="absolute top-4 right-4">
              <Badge type={item.trend === 'up' ? 'success' : 'error'}>
                {item.trendValue}
              </Badge>
            </div>
            <div className="mb-2 text-4xl text-primary">
              <Icon name={item.icon} />
            </div>
            <SectionTitle className="mb-1 text-lg">{item.label}</SectionTitle>
            <div className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">₹{item.value.toLocaleString()}</div>
          </GlassCard>
        ))}
      </div>
      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <GlassCard className="animate-fade-in-up">
          <SectionTitle className="mb-4">Expense Categories</SectionTitle>
          <div className="flex gap-3 mb-4 flex-wrap justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-5 py-2 rounded-xl font-semibold transition-all duration-200 border
                  ${activeCategory === cat
                    ? 'bg-blue-100 border-blue-400 text-blue-900 dark:bg-primary dark:text-white dark:border-primary dark:shadow-primary/40 dark:shadow-md'
                    : 'bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-200 hover:bg-primary/10 dark:hover:bg-primary/30 border-gray-200 dark:border-gray-700 shadow-neu'}
                `}
                style={{ letterSpacing: 0.5 }}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <Pie data={filteredPieData} />
        </GlassCard>
        <GlassCard className="animate-fade-in-up delay-200">
          <SectionTitle className="mb-4">Weekly Trends</SectionTitle>
          <Bar data={barData} />
        </GlassCard>
      </div>
      {/* Call to Action */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-8">
        <AnimatedButton>Generate Invoice</AnimatedButton>
        <Alert type="info" className="max-w-md">Tip: Download your monthly report as PDF for your records.</Alert>
      </div>
    </div>
  );
}
