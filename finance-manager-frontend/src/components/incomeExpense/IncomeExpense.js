import React, { useState } from 'react';
import Stepper from '../Stepper';
import SelectDropdown from '../SelectDropdown';
import Tag from '../Tag';

function IncomeExpense({ incomeExpense = [], netProfit, entryForm, setEntryForm, addEntry }) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = Array.from(new Set(incomeExpense.map(e => e.category))).filter(Boolean);

  // Filter and stats
  const filteredEntries = Array.isArray(incomeExpense)
    ? incomeExpense.filter(
        entry =>
          entry &&
          typeof entry === 'object' &&
          typeof entry.category === 'string' &&
          typeof entry.type === 'string' &&
          typeof entry.amount !== 'undefined'
      )
    : [];
  const searchedEntries = filteredEntries.filter(entry =>
    entry.category.toLowerCase().includes(search.toLowerCase()) ||
    entry.type.toLowerCase().includes(search.toLowerCase())
  );

  // CSV export
  const exportCSV = () => {
    const headers = ['Category', 'Type', 'Amount'];
    const rows = filteredEntries.map(entry => [entry.category, entry.type, entry.amount]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'income_expense_records.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-fuchsia-100 via-pink-50 to-yellow-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10 px-2 md:px-6 animate-gradient-x">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-fuchsia-600 via-pink-500 to-yellow-400 dark:from-fuchsia-800 dark:via-pink-800 dark:to-yellow-700 flex items-center justify-center shadow-2xl border-4 border-white/40 dark:border-gray-800 animate-gradient-x">
          <svg className="w-9 h-9 text-white dark:text-gray-100" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 0V4m0 16v-4" /></svg>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide text-fuchsia-700 dark:text-fuchsia-200 drop-shadow-2xl">Income & Expense</h1>
      </div>
      {/* Add Entry Stepper */}
      <div className="rounded-3xl bg-gradient-to-br from-white/90 via-fuchsia-50 to-yellow-50 dark:from-gray-900/90 dark:via-fuchsia-900/80 dark:to-yellow-900/80 shadow-2xl p-10 mb-12 flex flex-col md:flex-row md:items-end gap-6 relative border border-fuchsia-100 dark:border-fuchsia-900 animate-gradient-x">
        <Stepper
          steps={["Category", "Amount", "Type"]}
          currentStep={
            !entryForm.category ? 0 :
            !entryForm.amount ? 1 :
            !entryForm.type ? 2 : 3
          }
        >
          <form onSubmit={addEntry} className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block mb-1 font-semibold text-fuchsia-700 dark:text-fuchsia-200">Category</label>
              {categories.length ? (
                <SelectDropdown
                  options={categories.map(c => ({ label: c, value: c }))}
                  value={entryForm.category}
                  onChange={val => setEntryForm({ ...entryForm, category: val })}
                  placeholder="Select or type category"
                  allowCustom
                />
              ) : (
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-xl border border-fuchsia-200 dark:border-fuchsia-700 bg-white dark:bg-gray-800 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-100 dark:focus:ring-fuchsia-900 outline-none transition shadow"
                  placeholder="Enter category"
                  value={entryForm.category}
                  onChange={e => setEntryForm({ ...entryForm, category: e.target.value })}
                  required
                />
              )}
            </div>
            <div>
              <label className="block mb-1 font-semibold text-fuchsia-700 dark:text-fuchsia-200">Amount</label>
              <input type="number" className="w-full px-4 py-2 rounded-xl border border-fuchsia-200 dark:border-fuchsia-700 bg-white dark:bg-gray-800 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-100 dark:focus:ring-fuchsia-900 outline-none transition shadow" placeholder="Amount" value={entryForm.amount} onChange={e => setEntryForm({ ...entryForm, amount: e.target.value })} required />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-fuchsia-700 dark:text-fuchsia-200">Type</label>
              <SelectDropdown
                options={[
                  { label: "Income", value: "income" },
                  { label: "Expense", value: "expense" }
                ]}
                value={entryForm.type}
                onChange={val => setEntryForm({ ...entryForm, type: val })}
                placeholder="Select Type"
              />
            </div>
            <div className="flex items-end">
              <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 via-pink-500 to-yellow-400 dark:from-fuchsia-800 dark:via-pink-800 dark:to-yellow-700 text-white font-bold text-lg shadow-lg hover:scale-105 hover:shadow-xl transition animate-gradient-x">Add Entry</button>
            </div>
          </form>
        </Stepper>
      </div>
      {/* Category Filter Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Tag
          key="all"
          color={activeCategory === 'All' ? 'fuchsia' : 'gray'}
          onClick={() => setActiveCategory('All')}
          className="cursor-pointer"
        >
          All
        </Tag>
        {categories.map(cat => (
          <Tag
            key={cat}
            color={activeCategory === cat ? 'fuchsia' : 'gray'}
            onClick={() => setActiveCategory(cat)}
            className="cursor-pointer"
          >
            {cat}
          </Tag>
        ))}
      </div>
      {/* Records Table */}
      <div className="rounded-3xl bg-gradient-to-br from-white/95 via-fuchsia-50 to-yellow-50 dark:from-gray-900/95 dark:via-fuchsia-900/80 dark:to-yellow-900/80 shadow-2xl p-8 border border-fuchsia-100 dark:border-fuchsia-900 animate-gradient-x">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="text-2xl font-bold text-fuchsia-700 dark:text-fuchsia-200">Income & Expense Records</div>
          <div className="flex gap-2">
            <input
              type="text"
              className="px-4 py-2 rounded-xl border border-fuchsia-200 dark:border-fuchsia-700 text-gray-400 bg-white dark:bg-gray-800 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-100 dark:focus:ring-fuchsia-900 outline-none transition shadow"
              placeholder="Search by category or type..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button
              onClick={exportCSV}
              className="px-4 py-2 rounded-xl border border-fuchsia-600 dark:border-fuchsia-400 text-fuchsia-700 dark:text-fuchsia-200 font-semibold bg-fuchsia-50 dark:bg-fuchsia-900/30 hover:bg-fuchsia-100 dark:hover:bg-fuchsia-900/60 shadow transition"
            >
              Export CSV
            </button>
          </div>
        </div>
        <div className="overflow-x-auto rounded-xl">
          <table className="min-w-full rounded-xl overflow-hidden text-left shadow-xl">
            <thead className="sticky top-0 z-10">
              <tr className="bg-gradient-to-r from-fuchsia-200 via-pink-100 to-yellow-50/80 dark:from-fuchsia-900 dark:via-pink-900 dark:to-yellow-900/80 backdrop-blur-xl animate-gradient-x">
                <th className="px-6 py-3 font-bold text-fuchsia-700 dark:text-fuchsia-200">Category</th>
                <th className="px-6 py-3 font-bold text-fuchsia-700 dark:text-fuchsia-200">Type</th>
                <th className="px-6 py-3 font-bold text-fuchsia-700 dark:text-fuchsia-200">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {searchedEntries.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-6 text-center text-gray-400 dark:text-gray-500">No records found.</td>
                </tr>
              )}
              {searchedEntries.map((entry, index) => (
                <tr key={index} className={`transition hover:bg-fuchsia-50/80 dark:hover:bg-fuchsia-900/40 ${index % 2 === 0 ? 'bg-white/80 dark:bg-gray-800/80' : 'bg-fuchsia-50/60 dark:bg-fuchsia-900/30'}`}>
                  <td className="px-6 py-3 text-gray-300">{entry.category}</td>
                  <td className="px-6 py-3">
                    <span className={`inline-block px-4 py-1 rounded-full font-semibold text-sm shadow ${entry.type === 'income' ? 'bg-green-200 text-green-900 dark:bg-green-700 dark:text-green-100' : 'bg-red-200 text-red-900 dark:bg-red-700 dark:text-red-100'}`}>{entry.type === 'income' ? 'Income' : 'Expense'}</span>
                  </td>
                  <td className="px-6 py-3 font-bold text-gray-300">₹{entry.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 text-right text-xl font-bold text-fuchsia-700 dark:text-fuchsia-200">
          Net Profit/Loss: <span className={netProfit >= 0 ? 'text-green-600 dark:text-green-300' : 'text-red-600 dark:text-red-300'}>{netProfit >= 0 ? `+ ₹${netProfit}` : `- ₹${Math.abs(netProfit)}`}</span>
        </div>
      </div>
    </div>
  );
}

export default IncomeExpense;
