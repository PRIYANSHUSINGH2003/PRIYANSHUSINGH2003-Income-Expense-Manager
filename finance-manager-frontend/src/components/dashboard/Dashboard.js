import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Line
} from 'recharts';
import React, { useMemo, useState } from 'react';
import ChartCard from '../ChartCard';
import Tabs from '../Tabs';
import StatusDot from '../StatusDot';
import Badge from '../Badge';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AllInboxIcon from '@mui/icons-material/AllInbox';

const COLORS = ['#4caf50', '#f44336', '#2196f3', '#ff9800', '#9c27b0', '#00bcd4', '#ffc107'];

const summaryCards = [
  {
    label: 'Total Income',
    icon: '📈',
    valueKey: 'income',
    valueColor: 'text-green-600',
    bg: 'bg-green-50 dark:bg-green-900/30',
  },
  {
    label: 'Total Expense',
    icon: '📉',
    valueKey: 'expense',
    valueColor: 'text-red-600',
    bg: 'bg-red-50 dark:bg-red-900/30',
  },
  {
    label: 'Net Profit/Loss',
    icon: '💹',
    valueKey: 'netProfit',
    valueColor: 'text-blue-600',
    bg: 'bg-blue-50 dark:bg-blue-900/30',
  },
  {
    label: 'Stock Net Profit/Loss',
    icon: '📦',
    valueKey: 'netProfitStock',
    valueColor: 'text-yellow-600',
    bg: 'bg-yellow-50 dark:bg-yellow-900/30',
  },
];

const CATEGORY_ICONS = {
  Food: <FastfoodIcon color="primary" />,
  Transport: <DirectionsBusIcon color="secondary" />,
  Health: <LocalHospitalIcon color="error" />,
  Shopping: <ShoppingCartIcon color="action" />,
  Other: <AllInboxIcon color="disabled" />,
};

function Dashboard({ incomeExpense, netProfit, netProfitStock, stock }) {
  const [loading] = useState(false); // Simulate loading state
  const [error] = useState(null); // Simulate error state
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [tab, setTab] = useState('Today');

  // Filter data based on selected tab
  const now = new Date();
  const filterByTab = (data) => {
    if (tab === 'Today') {
      const today = now.toISOString().slice(0, 10);
      return data.filter(e => e.date && e.date.startsWith(today));
    }
    if (tab === 'This Week') {
      const weekAgo = new Date(now);
      weekAgo.setDate(now.getDate() - 6);
      return data.filter(e => {
        const d = new Date(e.date);
        return d >= weekAgo && d <= now;
      });
    }
    if (tab === 'This Month') {
      const month = now.getMonth();
      const year = now.getFullYear();
      return data.filter(e => {
        const d = new Date(e.date);
        return d.getMonth() === month && d.getFullYear() === year;
      });
    }
    return data;
  };

  const filteredIncomeExpense = filterByTab(incomeExpense);

  const totalIncome = filteredIncomeExpense.filter(e => e.type === 'income').reduce((acc, cur) => acc + Number(cur.amount), 0);
  const totalExpense = filteredIncomeExpense.filter(e => e.type === 'expense').reduce((acc, cur) => acc + Number(cur.amount), 0);

  // Prepare data for line chart (income/expense over time)
  const trendData = useMemo(() => {
    const byDate = {};
    filteredIncomeExpense.forEach(e => {
      const date = new Date(e.date).toISOString().slice(0, 10);
      if (!byDate[date]) byDate[date] = { date, income: 0, expense: 0 };
      if (e.type === 'income') byDate[date].income += Number(e.amount);
      if (e.type === 'expense') byDate[date].expense += Number(e.amount);
    });
    return Object.values(byDate).sort((a, b) => a.date.localeCompare(b.date));
  }, [filteredIncomeExpense]);

  // Prepare data for pie chart (category breakdown)
  const categoryData = useMemo(() => {
    const catMap = {};
    incomeExpense.forEach(e => {
      if (!catMap[e.category]) catMap[e.category] = 0;
      catMap[e.category] += Number(e.amount);
    });
    let arr = Object.entries(catMap).map(([name, value]) => ({ name, value }));
    if (selectedCategory !== 'All') {
      arr = arr.filter(cat => cat.name === selectedCategory);
    }
    return arr;
  }, [incomeExpense, selectedCategory]);

  // Prepare recent activity (combine incomeExpense and stock, sort by date desc)
  const recentActivity = useMemo(() => {
    const incomeExpenseEvents = incomeExpense.map(e => ({
      type: e.type === 'income' ? 'Income' : 'Expense',
      category: e.category,
      amount: e.amount,
      date: e.date,
      icon: e.type === 'income' ? '⬆️' : '⬇️',
      color: e.type === 'income' ? 'bg-green-500' : 'bg-red-500',
      label: e.type === 'income' ? 'Income' : 'Expense',
    }));
    const stockEvents = (stock || []).map(s => ({
      type: 'Stock',
      category: s.type,
      amount: s.amount,
      date: s.date,
      icon: '📦',
      color: 'bg-blue-500',
      label: `Stock (${s.type})`,
    }));
    return [...incomeExpenseEvents, ...stockEvents]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
  }, [incomeExpense, stock]);

  // Error boundary
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] p-8 bg-white/80 rounded-2xl shadow-lg">
        <ErrorOutlineIcon color="error" style={{ fontSize: 48 }} />
        <div className="mt-4 text-lg font-bold text-red-600">Something went wrong loading the dashboard.</div>
        <div className="text-gray-500">{error.message || 'Unknown error.'}</div>
      </div>
    );
  }

  return (
    <div className="p-2 md:p-8 bg-gradient-to-br from-blue-100 via-white to-green-100 dark:from-gray-900 dark:to-gray-800 min-h-screen rounded-3xl shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary dark:text-accent drop-shadow-lg flex items-center gap-3">
          <svg className="w-8 h-8 text-primary dark:text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" /></svg>
          Dashboard
        </h2>
        <a href="#/invoices" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-bold shadow-lg hover:scale-105 hover:from-accent hover:to-primary transition-all text-lg">
          <span className="text-2xl">➕</span> Create Invoice
        </a>
      </div>

      {/* Tabs for time range */}
      <div className="mb-6">
        <Tabs
          tabs={['Today', 'This Week', 'This Month']}
          value={tab}
          onChange={setTab}
          className="w-full max-w-md mx-auto"
        />
      </div>

      {/* Quick Stats with StatusDot and Badge */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="flex flex-col items-center p-6 rounded-3xl shadow-xl glassmorphism-card bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-green-900/30 dark:to-gray-900/30 border border-green-200 dark:border-green-800 animate-fadeInUp hover:scale-105 transition-all">
          <StatusDot color="green" className="mb-2" />
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">Total Income</div>
          <div className="text-2xl md:text-3xl font-bold mt-1 text-green-600">₹{totalIncome}</div>
          <Badge color="green" className="mt-2">Income</Badge>
        </div>
        <div className="flex flex-col items-center p-6 rounded-3xl shadow-xl glassmorphism-card bg-gradient-to-br from-red-50 via-white to-red-100 dark:from-red-900/30 dark:to-gray-900/30 border border-red-200 dark:border-red-800 animate-fadeInUp hover:scale-105 transition-all">
          <StatusDot color="red" className="mb-2" />
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">Total Expense</div>
          <div className="text-2xl md:text-3xl font-bold mt-1 text-red-600">₹{totalExpense}</div>
          <Badge color="red" className="mt-2">Expense</Badge>
        </div>
        <div className="flex flex-col items-center p-6 rounded-3xl shadow-xl glassmorphism-card bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-blue-900/30 dark:to-gray-900/30 border border-blue-200 dark:border-blue-800 animate-fadeInUp hover:scale-105 transition-all">
          <StatusDot color="blue" className="mb-2" />
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">Net Profit/Loss</div>
          <div className="text-2xl md:text-3xl font-bold mt-1 text-blue-600">{netProfit >= 0 ? `+ ₹${netProfit}` : `- ₹${Math.abs(netProfit)}`}</div>
          <Badge color="blue" className="mt-2">Net</Badge>
        </div>
        <div className="flex flex-col items-center p-6 rounded-3xl shadow-xl glassmorphism-card bg-gradient-to-br from-yellow-50 via-white to-yellow-100 dark:from-yellow-900/30 dark:to-gray-900/30 border border-yellow-200 dark:border-yellow-800 animate-fadeInUp hover:scale-105 transition-all">
          <StatusDot color="yellow" className="mb-2" />
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">Stock Net Profit/Loss</div>
          <div className="text-2xl md:text-3xl font-bold mt-1 text-yellow-600">{netProfitStock >= 0 ? `+ ₹${netProfitStock}` : `- ₹${Math.abs(netProfitStock)}`}</div>
          <Badge color="yellow" className="mt-2">Stock</Badge>
        </div>
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Income & Expense Trend" className="col-span-1">
          {/* Place your chart here, e.g., recharts or other chart lib */}
          {/* ...existing chart code can be placed here... */}
        </ChartCard>
        <div className="col-span-1 flex flex-col gap-6">
          <div className="bg-white/80 dark:bg-gray-900/70 rounded-2xl shadow-lg p-5 mb-6 glassmorphism-card" style={{backdropFilter:'blur(8px)', boxShadow:'0 8px 32px 0 rgba(31,38,135,0.18)'}}>
            <div className="font-bold text-blue-700 dark:text-blue-300 mb-2">Category Breakdown</div>
            <div className="w-full h-64">
              {loading
                ? <div className="w-44 h-44 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse mx-auto" />
                : <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        fill="#8884d8"
                        label
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>}
            </div>
          </div>
          <div className="bg-white/80 dark:bg-gray-900/70 rounded-2xl shadow-lg p-5 glassmorphism-card" style={{backdropFilter:'blur(8px)', boxShadow:'0 8px 32px 0 rgba(31,38,135,0.18)'}}>
            <div className="font-bold text-blue-700 dark:text-blue-300 mb-2">Recent Activity</div>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {loading
                ? Array.from({ length: 3 }).map((_, idx) => (
                    <li key={idx} className="flex items-center gap-3 py-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
                      <div className="flex-1">
                        <div className="h-5 w-28 bg-gray-200 dark:bg-gray-800 rounded mb-1 animate-pulse" />
                        <div className="h-4 w-20 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                      </div>
                      <div className="h-6 w-16 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                    </li>
                  ))
                : recentActivity.length === 0
                ? <li className="py-3 text-gray-400 text-center">No recent activity.</li>
                : recentActivity.map((activity, idx) => (
                    <li key={idx} className="flex items-center gap-3 py-3 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg transition">
                      <div className={`w-10 h-10 flex items-center justify-center rounded-full text-xl ${activity.color}`}>{activity.icon}</div>
                      <div className="flex-1">
                        <div className="font-semibold">{activity.label + (activity.category ? `: ${activity.category}` : '')}</div>
                        <div className="text-xs text-gray-500">₹{activity.amount} • {new Date(activity.date).toLocaleString()}</div>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-bold ${activity.type === 'Income' ? 'bg-green-100 text-green-700' : activity.type === 'Expense' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>{activity.label}</span>
                    </li>
                  ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="col-span-1 bg-white/80 dark:bg-gray-900/70 rounded-2xl shadow-lg p-5 glassmorphism-card" style={{backdropFilter:'blur(8px)', boxShadow:'0 8px 32px 0 rgba(31,38,135,0.18)'}}>
          <div className="font-bold text-blue-700 dark:text-blue-300 mb-2">Income & Expense Trend</div>
          <div className="w-full h-64">
            {loading
              ? <div className="w-full h-64 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
              : <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="income" stroke="#4caf50" name="Income" />
                    <Line type="monotone" dataKey="expense" stroke="#f44336" name="Expense" />
                  </LineChart>
                </ResponsiveContainer>}
          </div>
        </div>
        <div className="col-span-1 flex flex-col gap-6">
          <div className="bg-white/80 dark:bg-gray-900/70 rounded-2xl shadow-lg p-5 mb-6 glassmorphism-card" style={{backdropFilter:'blur(8px)', boxShadow:'0 8px 32px 0 rgba(31,38,135,0.18)'}}>
            <div className="font-bold text-blue-700 dark:text-blue-300 mb-2">Category Breakdown</div>
            <div className="w-full h-64">
              {loading
                ? <div className="w-44 h-44 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse mx-auto" />
                : <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        fill="#8884d8"
                        label
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>}
            </div>
          </div>
          <div className="bg-white/80 dark:bg-gray-900/70 rounded-2xl shadow-lg p-5 glassmorphism-card" style={{backdropFilter:'blur(8px)', boxShadow:'0 8px 32px 0 rgba(31,38,135,0.18)'}}>
            <div className="font-bold text-blue-700 dark:text-blue-300 mb-2">Recent Activity</div>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {loading
                ? Array.from({ length: 3 }).map((_, idx) => (
                    <li key={idx} className="flex items-center gap-3 py-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
                      <div className="flex-1">
                        <div className="h-5 w-28 bg-gray-200 dark:bg-gray-800 rounded mb-1 animate-pulse" />
                        <div className="h-4 w-20 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                      </div>
                      <div className="h-6 w-16 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                    </li>
                  ))
                : recentActivity.length === 0
                ? <li className="py-3 text-gray-400 text-center">No recent activity.</li>
                : recentActivity.map((activity, idx) => (
                    <li key={idx} className="flex items-center gap-3 py-3 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg transition">
                      <div className={`w-10 h-10 flex items-center justify-center rounded-full text-xl ${activity.color}`}>{activity.icon}</div>
                      <div className="flex-1">
                        <div className="font-semibold">{activity.label + (activity.category ? `: ${activity.category}` : '')}</div>
                        <div className="text-xs text-gray-500">₹{activity.amount} • {new Date(activity.date).toLocaleString()}</div>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-bold ${activity.type === 'Income' ? 'bg-green-100 text-green-700' : activity.type === 'Expense' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>{activity.label}</span>
                    </li>
                  ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
