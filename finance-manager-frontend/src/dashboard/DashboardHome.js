import React, { useState } from 'react';
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

const summaryData = [
  { label: 'Income', value: 12000, icon: 'wallet', color: 'from-green-400 to-blue-400', trend: 'up', trendValue: '+8%' },
  { label: 'Expenses', value: 8000, icon: 'invoice', color: 'from-red-400 to-pink-400', trend: 'down', trendValue: '-3%' },
  { label: 'Savings', value: 4000, icon: 'dashboard', color: 'from-blue-400 to-purple-400', trend: 'up', trendValue: '+2%' },
];

const pieData = {
  labels: ['Health', 'Travel', 'Food', 'Shopping'],
  datasets: [
    {
      data: [1200, 900, 2000, 1500],
      backgroundColor: ['#42a5f5', '#f50057', '#4caf50', '#ff9800'],
      borderWidth: 2,
    },
  ],
};

const barData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    {
      label: 'Income',
      data: [3000, 3200, 2900, 2900],
      backgroundColor: '#1976d2',
    },
    {
      label: 'Expenses',
      data: [2000, 2100, 1900, 2000],
      backgroundColor: '#f50057',
    },
  ],
};

export default function DashboardHome() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [showNotif, setShowNotif] = useState(false);
  const [showAddEntry, setShowAddEntry] = useState(false);
  const categories = ['All', 'Health', 'Travel', 'Food', 'Shopping'];

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
          <Avatar alt="A" status="online" size={56} />
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold font-heading text-primary dark:text-white mb-1">Welcome back, Priyanshu!</h1>
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
        onCreate={entry => {
          alert('Entry created: ' + JSON.stringify(entry));
          setShowAddEntry(false);
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
            <div className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">${item.value.toLocaleString()}</div>
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
