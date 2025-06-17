import React, { useState } from 'react';

function Stock({ stock = [], netProfitStock, stockForm, setStockForm, addStock }) {
  const [search, setSearch] = useState('');

  // Filter and stats
  const validStock = Array.isArray(stock)
    ? stock.filter(
        item =>
          item &&
          typeof item === 'object' &&
          typeof item.type === 'string' &&
          typeof item.vendor === 'string'
      )
    : [];
  const filteredStock = validStock.filter(item =>
    item.type.toLowerCase().includes(search.toLowerCase()) ||
    item.vendor.toLowerCase().includes(search.toLowerCase())
  );
  const totalItems = validStock.length;
  const totalValue = validStock.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);

  // CSV export
  const exportCSV = () => {
    const headers = ['Type', 'Vendor', 'Amount'];
    const rows = filteredStock.map(item => [item.type, item.vendor, item.amount]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'stock_records.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-200 via-indigo-100 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10 px-2 md:px-6 animate-gradient-x">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 via-indigo-400 to-green-400 dark:from-blue-900 dark:via-indigo-800 dark:to-green-700 flex items-center justify-center shadow-2xl border-4 border-white/40 dark:border-gray-800">
          <span role="img" aria-label="stock" className="text-4xl">📦</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide text-blue-900 dark:text-white drop-shadow-2xl">Stock Management</h1>
      </div>
      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="rounded-3xl bg-gradient-to-br from-green-500 via-emerald-400 to-lime-300 dark:from-green-700 dark:via-emerald-600 dark:to-lime-500 shadow-2xl p-8 flex items-center gap-5 transform hover:scale-105 hover:shadow-3xl transition-all duration-200 border border-white/30 dark:border-gray-800 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 dark:bg-white/5 pointer-events-none" />
          <div className="w-14 h-14 rounded-full bg-white/80 dark:bg-gray-900/80 flex items-center justify-center text-green-700 dark:text-green-200 text-3xl shadow-lg z-10">
            {/* Heroicon: Cube */}
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.5 7.5l-8.5-4.5-8.5 4.5m17 0v9a2 2 0 01-1 1.73l-7.5 4.27a2 2 0 01-2 0l-7.5-4.27A2 2 0 013 16.5v-9" /></svg>
          </div>
          <div className="z-10">
            <div className="text-white/90 dark:text-white/80 text-base font-semibold">Total Items</div>
            <div className="text-3xl font-extrabold text-white dark:text-white drop-shadow">{totalItems}</div>
          </div>
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-blue-700 via-indigo-500 to-cyan-400 dark:from-blue-900 dark:via-indigo-800 dark:to-cyan-700 shadow-2xl p-8 flex items-center gap-5 transform hover:scale-105 hover:shadow-3xl transition-all duration-200 border border-white/30 dark:border-gray-800 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 dark:bg-white/5 pointer-events-none" />
          <div className="w-14 h-14 rounded-full bg-white/80 dark:bg-gray-900/80 flex items-center justify-center text-blue-700 dark:text-blue-200 text-3xl shadow-lg z-10">
            {/* Heroicon: CurrencyRupee */}
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 6h12M6 12h12M6 18h7a5 5 0 00-5-5H6" /></svg>
          </div>
          <div className="z-10">
            <div className="text-white/90 dark:text-white/80 text-base font-semibold">Total Value</div>
            <div className="text-3xl font-extrabold text-white dark:text-white drop-shadow">₹{totalValue}</div>
          </div>
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-yellow-400 via-orange-300 to-pink-300 dark:from-yellow-600 dark:via-orange-500 dark:to-pink-500 shadow-2xl p-8 flex items-center gap-5 transform hover:scale-105 hover:shadow-3xl transition-all duration-200 border border-white/30 dark:border-gray-800 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 dark:bg-white/5 pointer-events-none" />
          <div className="w-14 h-14 rounded-full bg-white/80 dark:bg-gray-900/80 flex items-center justify-center text-yellow-700 dark:text-yellow-200 text-3xl shadow-lg z-10">
            {/* Heroicon: TrendingUp */}
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 17l6-6 4 4 8-8" /></svg>
          </div>
          <div className="z-10">
            <div className="text-white/90 dark:text-white/80 text-base font-semibold">Net Profit/Loss</div>
            <div className={`text-3xl font-extrabold drop-shadow ${netProfitStock >= 0 ? 'text-green-900 dark:text-green-200' : 'text-red-700 dark:text-red-300'}`}>{netProfitStock >= 0 ? `+ ₹${netProfitStock}` : `- ₹${Math.abs(netProfitStock)}`}</div>
          </div>
        </div>
      </div>
      {/* Add Stock Form */}
      <div className="rounded-3xl bg-white/90 dark:bg-gray-900/90 shadow-2xl p-10 mb-12 flex flex-col md:flex-row md:items-end gap-6 relative border border-blue-100 dark:border-gray-800">
        <form onSubmit={addStock} className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">Type</label>
            <input type="text" className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 outline-none transition shadow" placeholder="purchase/sale" value={stockForm.type} onChange={e => setStockForm({ ...stockForm, type: e.target.value })} required />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">Vendor</label>
            <input type="text" className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 outline-none transition shadow" placeholder="Vendor name" value={stockForm.vendor} onChange={e => setStockForm({ ...stockForm, vendor: e.target.value })} required />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">Amount</label>
            <input type="number" className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 outline-none transition shadow" placeholder="Amount" value={stockForm.amount} onChange={e => setStockForm({ ...stockForm, amount: e.target.value })} required />
          </div>
          <div className="flex items-end">
            <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-green-500 dark:from-blue-800 dark:to-green-700 text-white font-bold text-lg shadow-lg hover:scale-105 hover:shadow-xl transition">Add Stock</button>
          </div>
        </form>
      </div>
      {/* Stock Table */}
      <div className="rounded-3xl bg-white/95 dark:bg-gray-900/95 shadow-2xl p-8 border border-blue-100 dark:border-gray-800">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="text-2xl font-bold text-blue-700 dark:text-blue-200">Stock Records</div>
          <div className="flex gap-2">
            <input
              type="text"
              className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 outline-none transition shadow"
              placeholder="Search by type or vendor..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button
              onClick={exportCSV}
              className="px-4 py-2 rounded-xl border border-blue-600 dark:border-blue-400 text-blue-700 dark:text-blue-200 font-semibold bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/60 shadow transition"
            >
              Export CSV
            </button>
          </div>
        </div>
        <div className="overflow-x-auto rounded-xl">
          <table className="min-w-full rounded-xl overflow-hidden text-left shadow-xl">
            <thead className="sticky top-0 z-10">
              <tr className="bg-gradient-to-r from-blue-200 via-blue-100 to-blue-50/80 dark:from-blue-900 dark:via-blue-800 dark:to-blue-900/80 backdrop-blur-xl">
                <th className="px-6 py-3 font-bold text-blue-700 dark:text-blue-200">Type</th>
                <th className="px-6 py-3 font-bold text-blue-700 dark:text-blue-200">Vendor</th>
                <th className="px-6 py-3 font-bold text-blue-700 dark:text-blue-200">Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredStock.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-6 text-center text-gray-400 dark:text-gray-500">No records found.</td>
                </tr>
              )}
              {filteredStock.map((item, index) => (
                item && typeof item.type === 'string' && typeof item.vendor === 'string' ? (
                  <tr key={index} className={`transition hover:bg-blue-50/80 dark:hover:bg-blue-900/40 ${index % 2 === 0 ? 'bg-white/80 dark:bg-gray-800/80' : 'bg-blue-50/60 dark:bg-blue-900/30'}`}>
                    <td className="px-6 py-3">
                      <span className={`inline-block px-4 py-1 rounded-full font-semibold text-sm shadow ${item.type.toLowerCase() === 'purchase' ? 'bg-green-200 text-green-900 dark:bg-green-700 dark:text-green-100' : 'bg-red-200 text-red-900 dark:bg-red-700 dark:text-red-100'}`}>{item.type}</span>
                    </td>
                    <td className="px-6 py-3">{item.vendor}</td>
                    <td className="px-6 py-3 font-bold">₹{item.amount}</td>
                  </tr>
                ) : null
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 text-right text-xl font-bold text-blue-700 dark:text-blue-200">
          Net Profit/Loss: <span className={netProfitStock >= 0 ? 'text-green-600 dark:text-green-300' : 'text-red-600 dark:text-red-300'}>{netProfitStock >= 0 ? `+ ₹${netProfitStock}` : `- ₹${Math.abs(netProfitStock)}`}</span>
        </div>
      </div>
    </div>
  );
}

export default Stock;
