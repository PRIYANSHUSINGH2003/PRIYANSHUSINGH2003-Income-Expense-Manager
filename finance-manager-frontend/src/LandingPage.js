import React from 'react';

const features = [
  {
    title: 'AI Financial Assistant',
    desc: 'Get smart, actionable suggestions to save more and spend better.',
    icon: (
      <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m4 0h-1v-4h-1m-4 0h-1v-4h-1" /></svg>
    ),
  },
  {
    title: 'Geo-Tagged Expense Map',
    desc: 'Visualize your spending hotspots on an interactive map.',
    icon: (
      <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /></svg>
    ),
  },
  {
    title: 'Eco-Spending Analyzer',
    desc: 'Track your environmental impact and discover greener choices.',
    icon: (
      <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 0v10l6 3" /></svg>
    ),
  },
  {
    title: 'Smart Bill Splitter',
    desc: 'Split bills with friends, track balances, and settle up instantly.',
    icon: (
      <svg className="w-10 h-10 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a5 5 0 00-10 0v2a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2z" /></svg>
    ),
  },
  {
    title: 'Charity & Impact Tracker',
    desc: 'See your giving history and discover new causes to support.',
    icon: (
      <svg className="w-10 h-10 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21C12 21 4 13.5 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.5 16 21 16 21H12z" /></svg>
    ),
  },
];

const demoStats = [
  {
    label: 'Total Income',
    value: '₹1,20,000',
    color: 'from-green-400 to-green-600',
    icon: (
      <svg className="w-8 h-8 text-green-100" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 0V4m0 16v-4" /></svg>
    ),
  },
  {
    label: 'Total Expenses',
    value: '₹80,000',
    color: 'from-red-400 to-red-600',
    icon: (
      <svg className="w-8 h-8 text-red-100" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7-7-7" /></svg>
    ),
  },
  {
    label: 'Net Profit',
    value: '₹40,000',
    color: 'from-blue-400 to-blue-600',
    icon: (
      <svg className="w-8 h-8 text-blue-100" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 17l6-6 4 4 8-8" /></svg>
    ),
  },
];

const contactDetails = {
  email: 'support@financemanager.com',
  phone: '+91 98765 43210',
  address: '123, Fintech Street, Mumbai, India',
};

const LandingPage = ({ children }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 flex flex-col">
    <header className="w-full py-8 px-4 flex flex-col items-center bg-white/60 backdrop-blur-md shadow">
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-2 drop-shadow-lg">Next-Gen Income & Expense Manager</h1>
      <p className="text-lg text-gray-700 max-w-2xl text-center mb-4">Empower your finances with rare, smart, and delightful features you won’t find anywhere else.</p>
      <a href="#features" className="mt-2 py-3 px-8 rounded-full bg-blue-600 text-white font-bold text-lg shadow-lg hover:bg-blue-700 transition">See Features</a>
      {children}
    </header>
    {/* Demo Stats Section */}
    <section className="w-full max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">Demo Dashboard Preview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {demoStats.map((stat) => (
          <div key={stat.label} className={`rounded-2xl bg-gradient-to-br ${stat.color} shadow-xl p-6 flex items-center gap-4 text-white`}>
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shadow-lg">
              {stat.icon}
            </div>
            <div>
              <div className="text-lg font-semibold">{stat.label}</div>
              <div className="text-2xl font-extrabold">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-2xl bg-white/80 shadow-xl p-8 mb-8">
        <h3 className="text-xl font-bold text-blue-700 mb-4">Recent Activity (Demo)</h3>
        <table className="min-w-full rounded-xl overflow-hidden text-left shadow">
          <thead>
            <tr className="bg-blue-100">
              <th className="px-6 py-3 font-bold text-blue-700">Category</th>
              <th className="px-6 py-3 font-bold text-blue-700">Type</th>
              <th className="px-6 py-3 font-bold text-blue-700">Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <td className="px-6 py-3">Salary</td>
              <td className="px-6 py-3"><span className="inline-block px-4 py-1 rounded-full font-semibold text-sm bg-green-100 text-green-700">Income</span></td>
              <td className="px-6 py-3 font-bold">₹60,000</td>
            </tr>
            <tr className="bg-blue-50">
              <td className="px-6 py-3">Groceries</td>
              <td className="px-6 py-3"><span className="inline-block px-4 py-1 rounded-full font-semibold text-sm bg-red-100 text-red-700">Expense</span></td>
              <td className="px-6 py-3 font-bold">₹8,000</td>
            </tr>
            <tr className="bg-white">
              <td className="px-6 py-3">Freelance</td>
              <td className="px-6 py-3"><span className="inline-block px-4 py-1 rounded-full font-semibold text-sm bg-green-100 text-green-700">Income</span></td>
              <td className="px-6 py-3 font-bold">₹20,000</td>
            </tr>
            <tr className="bg-blue-50">
              <td className="px-6 py-3">Utilities</td>
              <td className="px-6 py-3"><span className="inline-block px-4 py-1 rounded-full font-semibold text-sm bg-red-100 text-red-700">Expense</span></td>
              <td className="px-6 py-3 font-bold">₹3,000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    {/* Features Section */}
    <section id="features" className="flex-1 w-full max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">Why Choose Us?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map(f => (
          <div key={f.title} className="rounded-2xl bg-white/70 shadow-xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform">
            <div className="mb-4">{f.icon}</div>
            <div className="text-xl font-semibold text-blue-700 mb-2">{f.title}</div>
            <div className="text-gray-700 mb-2">{f.desc}</div>
          </div>
        ))}
      </div>
      <div className="mt-12 flex flex-col items-center">
        <h3 className="text-xl font-bold text-green-700 mb-2">Ready to take control?</h3>
        <a href="#" className="py-3 px-8 rounded-full bg-green-500 text-white font-bold text-lg shadow-lg hover:bg-green-600 transition">Start Managing Now</a>
      </div>
    </section>
    {/* Contact Details Section */}
    <section className="w-full max-w-3xl mx-auto px-4 py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">Contact Us</h2>
      <div className="rounded-2xl bg-white/80 shadow-xl p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div className="flex-1">
          <div className="mb-2 text-lg font-semibold text-blue-700">Email:</div>
          <div className="mb-4 text-gray-700"><a href={`mailto:${contactDetails.email}`} className="underline hover:text-blue-600">{contactDetails.email}</a></div>
          <div className="mb-2 text-lg font-semibold text-blue-700">Phone:</div>
          <div className="mb-4 text-gray-700"><a href={`tel:${contactDetails.phone}`} className="underline hover:text-blue-600">{contactDetails.phone}</a></div>
          <div className="mb-2 text-lg font-semibold text-blue-700">Address:</div>
          <div className="text-gray-700">{contactDetails.address}</div>
        </div>
        <div className="flex-1 mt-8 md:mt-0">
          <form className="flex flex-col gap-4">
            <input type="text" placeholder="Your Name" className="px-4 py-2 rounded-xl border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition shadow" required />
            <input type="email" placeholder="Your Email" className="px-4 py-2 rounded-xl border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition shadow" required />
            <textarea placeholder="Your Message" className="px-4 py-2 rounded-xl border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition shadow" rows={4} required />
            <button type="submit" className="py-3 px-8 rounded-full bg-blue-600 text-white font-bold text-lg shadow-lg hover:bg-blue-700 transition">Send Message</button>
          </form>
        </div>
      </div>
    </section>
    <footer className="w-full py-6 text-center text-gray-500 text-sm bg-white/60 backdrop-blur-md mt-8">
      &copy; {new Date().getFullYear()} Income & Expense Manager. All rights reserved.
    </footer>
  </div>
);

export default LandingPage;
