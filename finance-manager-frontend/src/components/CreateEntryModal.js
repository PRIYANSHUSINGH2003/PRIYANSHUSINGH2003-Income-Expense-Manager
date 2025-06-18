import React, { useState } from 'react';
import Alert from '../common/Alert';

export default function CreateEntryModal({ open, onClose, onCreate }) {
  const [form, setForm] = useState({
    type: 'income',
    category: '',
    amount: '',
    note: '',
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  if (!open) return null;

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);
    try {
      if (!form.category || !form.amount) {
        setAlert({ type: 'warning', msg: 'Category and amount are required.' });
        setLoading(false);
        return;
      }
      await onCreate(form);
      setAlert({ type: 'success', msg: 'Entry created successfully!' });
      setForm({ type: 'income', category: '', amount: '', note: '' });
      setTimeout(() => {
        setAlert(null);
        onClose();
      }, 1200);
    } catch (err) {
      setAlert({ type: 'error', msg: 'Failed to create entry.' });
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 dark:bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white/80 dark:bg-gray-900/90 rounded-2xl shadow-2xl p-8 border border-primary/10 dark:border-accent/10 backdrop-blur-xl relative animate-fade-in">
        <button
          className="absolute top-3 right-4 text-2xl text-gray-500 dark:text-gray-300 hover:text-red-500"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6 text-primary dark:text-accent text-center">+ Add Entry</h2>
        {alert && <Alert type={alert.type} className="mb-4">{alert.msg}</Alert>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-3">
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="flex-1 py-2 px-3 rounded-lg border border-primary/30 dark:border-accent/30 bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-100 focus:outline-none"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Category"
              className="flex-1 py-2 px-3 rounded-lg border border-primary/30 dark:border-accent/30 bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-100 focus:outline-none"
              required
            />
          </div>
          <input
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            placeholder="Amount"
            className="py-2 px-3 rounded-lg border border-primary/30 dark:border-accent/30 bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-100 focus:outline-none"
            required
          />
          <input
            name="note"
            value={form.note}
            onChange={handleChange}
            placeholder="Note (optional)"
            className="py-2 px-3 rounded-lg border border-primary/30 dark:border-accent/30 bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-100 focus:outline-none"
          />
          <button
            type="submit"
            className="mt-2 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold text-lg shadow-lg hover:scale-105 hover:shadow-xl transition disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Adding...' : '+ Add Entry'}
          </button>
        </form>
      </div>
    </div>
  );
}
