import React, { useState } from 'react';

function Expense({ expenses = [], netExpense, expenseForm, setExpenseForm, addExpense }) {
  const [search, setSearch] = useState('');

  // Filter and stats
  const validExpenses = Array.isArray(expenses)
    ? expenses.filter(
        item =>
          item &&
          typeof item === 'object' &&
          typeof item.category === 'string' &&
          typeof item.description === 'string'
      )
    : [];
  const filteredExpenses = validExpenses.filter(item =>
    item.category.toLowerCase().includes(search.toLowerCase()) ||
    item.description.toLowerCase().includes(search.toLowerCase())
  );
  const totalItems = validExpenses.length;
  const totalValue = validExpenses.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);

  // CSV export
  const exportCSV = () => {
    const headers = ['Category', 'Description', 'Amount'];
    const rows = filteredExpenses.map(item => [item.category, item.description, item.amount]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'expense_records.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-red-200 via-pink-100 to-yellow-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10 px-2 md:px-6 animate-gradient-x">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-600 via-pink-400 to-yellow-400 dark:from-red-900 dark:via-pink-800 dark:to-yellow-700 flex items-center justify-center shadow-2xl border-4 border-white/40 dark:border-gray-800">
          <span role="img" aria-label="expense" className="text-4xl">💸</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide text-red-900 dark:text-white drop-shadow-2xl">Expense Management</h1>
      </div>
      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="rounded-3xl bg-gradient-to-br from-yellow-500 via-orange-400 to-pink-300 dark:from-yellow-700 dark:via-orange-600 dark:to-pink-500 shadow-2xl p-8 flex items-center gap-5 transform hover:scale-105 hover:shadow-3xl transition-all duration-200 border border-white/30 dark:border-gray-800 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 dark:bg-white/5 pointer-events-none" />
          <div className="w-14 h-14 rounded-full bg-white/80 dark:bg-gray-900/80 flex items-center justify-center text-yellow-700 dark:text-yellow-200 text-3xl shadow-lg z-10">
            {/* Heroicon: Cash */}
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a5 5 0 00-10 0v2a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2z" /></svg>
          </div>
          <div className="z-10">
            <div className="text-white/90 dark:text-white/80 text-base font-semibold">Total Expenses</div>
            <div className="text-3xl font-extrabold text-white dark:text-white drop-shadow">{totalItems}</div>
          </div>
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-pink-700 via-red-500 to-yellow-400 dark:from-pink-900 dark:via-red-800 dark:to-yellow-700 shadow-2xl p-8 flex items-center gap-5 transform hover:scale-105 hover:shadow-3xl transition-all duration-200 border border-white/30 dark:border-gray-800 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 dark:bg-white/5 pointer-events-none" />
          <div className="w-14 h-14 rounded-full bg-white/80 dark:bg-gray-900/80 flex items-center justify-center text-pink-700 dark:text-pink-200 text-3xl shadow-lg z-10">
            {/* Heroicon: CurrencyRupee */}
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 6h12M6 12h12M6 18h7a5 5 0 00-5-5H6" /></svg>
          </div>
          <div className="z-10">
            <div className="text-white/90 dark:text-white/80 text-base font-semibold">Total Value</div>
            <div className="text-3xl font-extrabold text-white dark:text-white drop-shadow">₹{totalValue}</div>
          </div>
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-red-400 via-pink-300 to-yellow-300 dark:from-red-600 dark:via-pink-500 dark:to-yellow-500 shadow-2xl p-8 flex items-center gap-5 transform hover:scale-105 hover:shadow-3xl transition-all duration-200 border border-white/30 dark:border-gray-800 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 dark:bg-white/5 pointer-events-none" />
          <div className="w-14 h-14 rounded-full bg-white/80 dark:bg-gray-900/80 flex items-center justify-center text-red-700 dark:text-red-200 text-3xl shadow-lg z-10">
            {/* Heroicon: TrendingDown */}
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 15l-5-5-4 4-8-8" /></svg>
          </div>
          <div className="z-10">
            <div className="text-white/90 dark:text-white/80 text-base font-semibold">Net Expense</div>
            <div className={`text-3xl font-extrabold drop-shadow text-red-900 dark:text-red-200`}>- ₹{netExpense}</div>
          </div>
        </div>
      </div>
      {/* Add Expense Form */}
      <div className="rounded-3xl bg-white/90 dark:bg-gray-900/90 shadow-2xl p-10 mb-12 flex flex-col md:flex-row md:items-end gap-6 relative border border-red-100 dark:border-gray-800">
        <form onSubmit={addExpense} className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">Category</label>
            <input type="text" className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-red-400 focus:ring-2 focus:ring-red-100 dark:focus:ring-red-900 outline-none transition shadow" placeholder="e.g. Office, Travel" value={expenseForm.category} onChange={e => setExpenseForm({ ...expenseForm, category: e.target.value })} required />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">Description</label>
            <input type="text" className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-red-400 focus:ring-2 focus:ring-red-100 dark:focus:ring-red-900 outline-none transition shadow" placeholder="Expense details" value={expenseForm.description} onChange={e => setExpenseForm({ ...expenseForm, description: e.target.value })} required />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">Amount</label>
            <input type="number" className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-red-400 focus:ring-2 focus:ring-red-100 dark:focus:ring-red-900 outline-none transition shadow" placeholder="Amount" value={expenseForm.amount} onChange={e => setExpenseForm({ ...expenseForm, amount: e.target.value })} required />
          </div>
          <div className="flex items-end">
            <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-yellow-500 dark:from-red-800 dark:to-yellow-700 text-white font-bold text-lg shadow-lg hover:scale-105 hover:shadow-xl transition">Add Expense</button>
          </div>
        </form>
      </div>
      {/* Expense Table */}
      <div className="rounded-3xl bg-white/95 dark:bg-gray-900/95 shadow-2xl p-8 border border-red-100 dark:border-gray-800">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="text-2xl font-bold text-red-700 dark:text-red-200">Expense Records</div>
          <div className="flex gap-2">
            <input
              type="text"
              className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-red-400 focus:ring-2 focus:ring-red-100 dark:focus:ring-red-900 outline-none transition shadow"
              placeholder="Search by category or description..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button
              onClick={exportCSV}
              className="px-4 py-2 rounded-xl border border-red-600 dark:border-red-400 text-red-700 dark:text-red-200 font-semibold bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/60 shadow transition"
            >
              Export CSV
            </button>
          </div>
        </div>
        <div className="overflow-x-auto rounded-xl">
          <table className="min-w-full rounded-xl overflow-hidden text-left shadow-xl">
            <thead className="sticky top-0 z-10">
              <tr className="bg-gradient-to-r from-red-200 via-pink-100 to-yellow-50/80 dark:from-red-900 dark:via-pink-800 dark:to-yellow-900/80 backdrop-blur-xl">
                <th className="px-6 py-3 font-bold text-red-700 dark:text-red-200">Category</th>
                <th className="px-6 py-3 font-bold text-red-700 dark:text-red-200">Description</th>
                <th className="px-6 py-3 font-bold text-red-700 dark:text-red-200">Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-6 text-center text-gray-400 dark:text-gray-500">No records found.</td>
                </tr>
              )}
              {filteredExpenses.map((item, index) => (
                item && typeof item.category === 'string' && typeof item.description === 'string' ? (
                  <tr key={index} className={`transition hover:bg-red-50/80 dark:hover:bg-red-900/40 ${index % 2 === 0 ? 'bg-white/80 dark:bg-gray-800/80' : 'bg-red-50/60 dark:bg-red-900/30'}`}>
                    <td className="px-6 py-3">
                      <span className="inline-block px-4 py-1 rounded-full font-semibold text-sm shadow bg-yellow-200 text-yellow-900 dark:bg-yellow-700 dark:text-yellow-100">{item.category}</span>
                    </td>
                    <td className="px-6 py-3">{item.description}</td>
                    <td className="px-6 py-3 font-bold">₹{item.amount}</td>
                  </tr>
                ) : null
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 text-right text-xl font-bold text-red-700 dark:text-red-200">
          Net Expense: <span className="text-red-600 dark:text-red-300">- ₹{netExpense}</span>
        </div>
      </div>
    </div>
  );
}

export default Expense;
