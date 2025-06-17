import React, { useMemo } from 'react';
import { FaRegFileAlt, FaRegLightbulb } from 'react-icons/fa';

// Example deduction rules (India-centric, but you can adapt)
const deductionRules = [
  { category: 'Health', section: '80D', rate: 0.25, tip: 'Health insurance premiums are deductible under 80D.' },
  { category: 'Donations', section: '80G', rate: 0.3, tip: 'Donations to eligible charities are deductible under 80G.' },
  { category: 'Education', section: '80C', rate: 0.3, tip: 'Tuition fees for children are deductible under 80C.' },
  { category: 'Investment', section: '80C', rate: 0.3, tip: 'Invest up to ₹1.5L in 80C instruments to maximize savings.' },
  // Add more as needed
];

function detectDeductions(expenses) {
  if (!Array.isArray(expenses)) return [];
  const deductions = [];
  deductionRules.forEach(rule => {
    const matched = expenses.filter(e => e && typeof e.category === 'string' && e.category.toLowerCase().includes(rule.category.toLowerCase()));
    if (matched.length) {
      const total = matched.reduce((sum, e) => sum + Number(e.amount || 0), 0);
      const save = Math.round(total * rule.rate);
      deductions.push({
        category: rule.category,
        section: rule.section,
        amount: total,
        save,
        tip: rule.tip,
      });
    }
  });
  return deductions;
}

export default function TaxOptimization({ expenses }) {
  const deductions = useMemo(() => detectDeductions(expenses), [expenses]);
  const totalSave = deductions.reduce((sum, d) => sum + d.save, 0);
  const tips = Array.from(new Set(deductions.map(d => d.tip)));

  const handleDownload = () => {
    const csv = [
      ['Category', 'Section', 'Amount', 'Estimated Savings'],
      ...deductions.map(d => [d.category, d.section, d.amount, d.save])
    ].map(row => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tax_deductions_report.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!deductions.length) return (
    <div className="bg-glass dark:bg-glassDark rounded-2xl p-6 shadow-lg text-center mt-8">
      <FaRegFileAlt className="mx-auto text-3xl text-primary mb-2" />
      <div className="font-bold text-lg mb-2">No tax-deductible expenses detected</div>
      <div className="text-gray-500">Add more expense data to see your tax savings here.</div>
    </div>
  );

  return (
    <div className="bg-glass dark:bg-glassDark rounded-2xl p-6 shadow-lg mt-8">
      <div className="font-bold text-xl mb-4 flex items-center gap-2 text-primary dark:text-white">
        <FaRegFileAlt className="text-2xl" /> Tax Optimization & Deductions
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {deductions.map((d, i) => (
          <div key={i} className="flex items-center gap-4 py-4">
            <div className="flex-1">
              <div className="font-semibold text-lg flex items-center gap-2">
                <span role="img" aria-label="deduction">💸</span> {d.category}
              </div>
              <div className="text-gray-500 text-sm flex items-center gap-2">
                Section: <span className="font-bold text-primary dark:text-accent">{d.section}</span>
              </div>
            </div>
            <div className="text-primary dark:text-accent font-bold text-lg min-w-[80px] text-right">₹{d.amount}</div>
            <div className="text-green-600 dark:text-green-400 font-bold text-lg min-w-[80px] text-right">Save: ₹{d.save}</div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-sm text-gray-500 dark:text-gray-400 text-center flex flex-col items-center gap-2">
        <div className="flex items-center gap-2"><FaRegLightbulb className="text-yellow-400" /> {tips.join(' | ')}</div>
        <div className="font-bold text-primary dark:text-accent">Total Estimated Savings: ₹{totalSave}</div>
        <button
          className="mt-3 px-5 py-2 rounded-lg bg-primary text-white font-bold shadow hover:bg-primary-dark transition"
          onClick={handleDownload}
        >
          Download Tax Report
        </button>
      </div>
    </div>
  );
}
