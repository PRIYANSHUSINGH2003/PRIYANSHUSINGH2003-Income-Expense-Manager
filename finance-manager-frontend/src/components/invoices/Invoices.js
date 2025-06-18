import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

// Helper to get user profile info (simulate, or fetch from backend if available)
const getUserProfile = async () => {
  // In real app, fetch from backend or context
  // Example: return await axios.get('/api/profile');
  return {
    businessName: 'My Business',
    address: '123 Main St, City, Country',
    contact: '+91-1234567890',
    logo: localStorage.getItem('invoiceLogo') || '', // fallback to localStorage for demo
  };
};

const domains = [
  { value: 'hospital', label: 'Hospital', icon: '🏥' },
  { value: 'auto', label: 'Auto Service', icon: '🚗' },
  { value: 'mall', label: 'Shopping Mall', icon: '🏬' },
  { value: 'retail', label: 'Retail Shop', icon: '🛒' },
];
const steps = ['Domain', 'Details', 'Items', 'Preview'];

function Invoices() {
  const [activeStep, setActiveStep] = useState(0);
  const [domain, setDomain] = useState('retail');
  const [details, setDetails] = useState({
    customerName: '',
    patientName: '',
    vehicle: '',
    date: new Date().toISOString().slice(0, 10),
    notes: '',
  });
  const [logo, setLogo] = useState('');
  const [profile, setProfile] = useState({ businessName: '', address: '', contact: '', logo: '' });
  const [editInvoiceId, setEditInvoiceId] = useState(null);
  const [items, setItems] = useState([{ name: '', qty: 1, price: '', tax: 0 }]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [search, setSearch] = useState('');
  const [invoiceList, setInvoiceList] = useState([]);
  const [taxRate, setTaxRate] = useState(5);
  const [billNumber, setBillNumber] = useState(null); // NEW
  const previewRef = useRef();

  useEffect(() => { fetchInvoices(); }, []);
  useEffect(() => {
    // Load user profile info (simulate or fetch)
    getUserProfile().then(setProfile);
    setLogo(localStorage.getItem('invoiceLogo') || '');
  }, []);

  const fetchInvoices = async () => {
    try {
      const res = await axios.get('http://localhost:5000/invoices');
      setInvoiceList(res.data.invoices || []);
    } catch (err) { setInvoiceList([]); }
  };

  const subtotal = items.reduce((sum, item) => sum + (Number(item.price || 0) * Number(item.qty || 1)), 0);
  const tax = subtotal * (taxRate / 100);
  const total = subtotal + tax;

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };
  const addItem = () => setItems([...items, { name: '', qty: 1, price: '', tax: 0 }]);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setLogo(ev.target.result);
      localStorage.setItem('invoiceLogo', ev.target.result); // For demo, store in localStorage
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // For demo, logo is not sent to backend. In real app, upload logo and store path.
    const res = await axios.post('http://localhost:5000/generate-invoice', {
      customerName: details.customerName,
      items: items.map(i => ({ name: i.name, price: Number(i.price) * Number(i.qty) })),
      total,
      notes: details.notes,
      logo, // send logo data if backend supports
      businessName: profile.businessName,
      address: profile.address,
      contact: profile.contact,
      editInvoiceId,
    });
    setBillNumber(res.data.billNumber || null); // NEW
    setSnackbar({ open: true, message: editInvoiceId ? 'Invoice updated!' : 'Invoice generated successfully!' });
    setDetails({ customerName: '', patientName: '', vehicle: '', date: new Date().toISOString().slice(0, 10), notes: '' });
    setItems([{ name: '', qty: 1, price: '', tax: 0 }]);
    setActiveStep(0);
    setLogo(localStorage.getItem('invoiceLogo') || '');
    setEditInvoiceId(null);
    fetchInvoices();
  };

  const filteredInvoices = invoiceList.filter(inv =>
    (inv.filename || '').toLowerCase().includes(search.toLowerCase()) ||
    (inv.customerName && inv.customerName.toLowerCase().includes(search.toLowerCase())) ||
    (inv.items && inv.items.some(i => i.name && i.name.toLowerCase().includes(search.toLowerCase())))
  );

  const exportCSV = () => {
    const headers = ['Filename', 'Download Link'];
    const rows = filteredInvoices.map(inv => [inv.filename, window.location.origin + '/' + inv.path]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'invoices.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const domainColors = {
    hospital: 'bg-red-100 text-red-700',
    auto: 'bg-blue-100 text-blue-700',
    mall: 'bg-green-100 text-green-700',
    retail: 'bg-yellow-100 text-yellow-700',
  };

  const InvoicePreview = () => {
    const handlePrint = () => {
      const printContents = previewRef.current.innerHTML;
      const win = window.open('', '', 'width=800,height=900');
      win.document.write(`
        <html><head><title>Invoice</title>
        <style>
          @media print {
            body { background: #fff !important; color: #222 !important; margin: 0; font-family: 'Inter', Arial, sans-serif; }
            .invoice-paper { max-width: 700px; margin: 0 auto; background: #fff !important; color: #222 !important; border-radius: 0; box-shadow: none; padding: 32px 24px; }
            .invoice-header { display: flex; align-items: center; gap: 16px; margin-bottom: 16px; }
            .invoice-logo-img { width: 64px; height: 64px; border-radius: 12px; object-fit: contain; background: #fff; border: 1px solid #eee; }
            .invoice-business { font-size: 22px; font-weight: 700; color: #222 !important; }
            .invoice-footer { margin-top: 32px; text-align: center; color: #888; font-size: 13px; }
            .invoice-notes { margin-top: 18px; font-size: 13px; color: #555; }
            .invoice-signature { margin-top: 32px; text-align: right; font-size: 14px; color: #333; }
            table { width: 100%; border-collapse: collapse; margin: 16px 0; }
            th, td { padding: 8px 12px; border-bottom: 1px solid #eee; }
            th { background: #f4f6fa; font-weight: 700; color: #222 !important; }
            .no-print { display: none !important; }
          }
          body { background: #fff !important; color: #222 !important; margin: 0; font-family: 'Inter', Arial, sans-serif; }
          .invoice-paper { max-width: 700px; margin: 40px auto; background: #fff !important; color: #222 !important; border-radius: 16px; box-shadow: 0 8px 32px 0 rgba(31,38,135,0.10); padding: 32px 24px; }
          .invoice-header { display: flex; align-items: center; gap: 16px; margin-bottom: 16px; }
          .invoice-logo-img { width: 64px; height: 64px; border-radius: 12px; object-fit: contain; background: #fff; border: 1px solid #eee; }
          .invoice-business { font-size: 22px; font-weight: 700; color: #1976d2; }
          .invoice-footer { margin-top: 32px; text-align: center; color: #888; font-size: 13px; }
          .invoice-notes { margin-top: 18px; font-size: 13px; color: #555; }
          .invoice-signature { margin-top: 32px; text-align: right; font-size: 14px; color: #333; }
          table { width: 100%; border-collapse: collapse; margin: 16px 0; }
          th, td { padding: 8px 12px; border-bottom: 1px solid #eee; }
          th { background: #f4f6fa; font-weight: 700; }
          .no-print { display: none !important; }
        </style>
        </head><body><div class="invoice-paper">${printContents}</div></body></html>
      `);
      win.document.close();
      win.print();
    };
    return (
      <div className={`rounded-2xl shadow-lg p-6 max-w-2xl mx-auto mt-4 bg-white dark:bg-gray-900 border ${domainColors[domain]}`}> 
        <div ref={previewRef}>
          <div className="invoice-header flex items-center gap-4 mb-4">
            {logo && <img src={logo} alt="Logo" className="invoice-logo-img" />}
            <div>
              <div className="invoice-business">{profile.businessName || 'Business Name'}</div>
              <div className="text-xs text-gray-500">{profile.address}</div>
              <div className="text-xs text-gray-500">Contact: {profile.contact}</div>
            </div>
            {/* Print-safe icon rendering */}
            <span className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold ml-auto print:text-3xl print:font-bold" style={{fontSize: '2.5rem', marginLeft: 'auto'}}>
              {domains.find(d => d.value === domain)?.icon}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <div className="text-xs text-gray-500">Date: {details.date}</div>
            <div className="text-xs text-gray-500">Invoice Type: {domains.find(d => d.value === domain)?.label}</div>
          </div>
          {/* Bill Number Display */}
          {billNumber && <div className="text-xs mb-1 font-bold text-blue-700">Bill No: {billNumber}</div>}
          {domain === 'hospital' && <div className="text-xs mb-1">Patient: <b>{details.patientName}</b></div>}
          {domain === 'auto' && <div className="text-xs mb-1">Vehicle: <b>{details.vehicle}</b></div>}
          <div className="text-xs mb-2">Customer: <b>{details.customerName}</b></div>
          <table className="w-full text-sm mb-2 border rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-3 text-left">Item</th>
                <th className="py-2 px-3 text-left">Qty</th>
                <th className="py-2 px-3 text-left">Price</th>
                <th className="py-2 px-3 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={idx} className="border-b last:border-b-0">
                  <td className="py-1 px-3">{item.name}</td>
                  <td className="py-1 px-3">{item.qty}</td>
                  <td className="py-1 px-3">₹{item.price}</td>
                  <td className="py-1 px-3">₹{Number(item.price || 0) * Number(item.qty || 1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between text-sm mt-2"><span>Subtotal:</span><span>₹{subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between text-sm"><span>Tax ({taxRate}%):</span><span>₹{tax.toFixed(2)}</span></div>
          <div className="flex justify-between font-bold text-base mt-1"><span>Total:</span><span>₹{total.toFixed(2)}</span></div>
          {details.notes && <div className="invoice-notes">Notes: {details.notes}</div>}
          <div className="invoice-signature">Signature: ____________________</div>
          <div className="text-center text-xs text-gray-400 mt-4">Powered by Income & Expense Manager</div>
        </div>
        <div className="flex gap-3 justify-center mt-4">
          <button type="button" onClick={handlePrint} className="px-4 py-2 rounded-lg border font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition">Print</button>
        </div>
      </div>
    );
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div className="mt-2">
            <div className="mb-2 font-semibold text-amber-100">Select Invoice Domain</div>
            <div className="flex gap-3 flex-wrap">
              {domains.map(d => (
                <button
                  key={d.value}
                  type="button"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold border transition ${domain === d.value ? 'bg-blue-600 text-white border-blue-600 shadow' : 'bg-white dark:bg-gray-800 text-gray-400 border-gray-300 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700'}`}
                  onClick={() => setDomain(d.value)}
                >
                  <span className="text-xl">{d.icon}</span> {d.label}
                </button>
              ))}
            </div>
          </div>
        );
      case 1:
        return (
          <div className="mt-2">
            <div className="mb-2 font-semibold text-gray-400">Invoice Details</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {domain === 'hospital' && (
                <input className="input input-bordered rounded-lg p-2 text-gray-500" placeholder="Patient Name" value={details.patientName} onChange={e => setDetails({ ...details, patientName: e.target.value })} required />
              )}
              {domain === 'auto' && (
                <input className="input input-bordered rounded-lg p-2 text-gray-500" placeholder="Vehicle" value={details.vehicle} onChange={e => setDetails({ ...details, vehicle: e.target.value })} required />
              )}
              <input className="input input-bordered rounded-lg p-2 text-gray-500" placeholder="Customer Name" value={details.customerName} onChange={e => setDetails({ ...details, customerName: e.target.value })} required />
              <input className="input input-bordered rounded-lg p-2 text-gray-500" type="date" value={details.date} onChange={e => setDetails({ ...details, date: e.target.value })} />
              <input className="input input-bordered rounded-lg p-2 text-gray-500" type="file" accept="image/*" onChange={handleLogoChange} />
              <textarea className="input input-bordered rounded-lg p-2 col-span-2 text-gray-500" placeholder="Notes (optional)" value={details.notes} onChange={e => setDetails({ ...details, notes: e.target.value })} />
              {logo && <img src={logo} alt="Logo Preview" className="w-20 h-20 object-contain border rounded-lg mt-2" />}
            </div>
            <div className="text-xs text-gray-500 mt-2">Business Info: {profile.businessName}, {profile.address}, {profile.contact}</div>
          </div>
        );
      case 2:
        return (
          <div className="mt-2">
            <div className="mb-2 font-semibold text-gray-400">Invoice Items</div>
            <div className="flex flex-col gap-2">
              {items.map((item, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-2 items-center text-gray-500">
                  <input className="col-span-5 rounded-lg p-2 border border-gray-800 text-gray-500" placeholder="Item Name" value={item.name} onChange={e => handleItemChange(idx, 'name', e.target.value)} required />
                  <input className="col-span-2 rounded-lg p-2 border border-gray-800 text-gray-500" type="number" placeholder="Qty" value={item.qty} onChange={e => handleItemChange(idx, 'qty', e.target.value)} required />
                  <input className="col-span-3 rounded-lg p-2 border border-gray-800 text-gray-500" type="number" placeholder="Price" value={item.price} onChange={e => handleItemChange(idx, 'price', e.target.value)} required />
                  <div className="col-span-2 flex items-center">
                    {idx === items.length - 1 && (
                      <button type="button" onClick={addItem} className="px-3 py-1 rounded-lg border border-gray-800 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition">Add</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              <input className="rounded-lg p-2 border border-gray-800 text-gray-500" type="number" placeholder="Tax Rate (%)" value={taxRate} onChange={e => setTaxRate(Number(e.target.value))} />
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-500"><span>Subtotal:</span><span>₹{subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between text-sm text-gray-500"><span>Tax ({taxRate}%):</span><span>₹{tax.toFixed(2)}</span></div>
            <div className="flex justify-between font-bold text-base mt-1 text-gray-500"><span>Total:</span><span>₹{total.toFixed(2)}</span></div>
          </div>
        );
      case 3:
        return <InvoicePreview />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4 flex items-center gap-2">🧾 Invoices</div>
      {/* Stepper */}
      <div className="flex items-center justify-between mb-6">
        {steps.map((label, idx) => (
          <div key={label} className={`flex-1 flex flex-col items-center ${idx < activeStep ? 'text-blue-600' : idx === activeStep ? 'text-blue-700 font-bold' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${idx <= activeStep ? 'border-blue-600 bg-blue-100' : 'border-gray-300 bg-gray-100'} mb-1`}>{idx + 1}</div>
            <div className="text-xs text-center">{label}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 mb-6">
        {getStepContent(activeStep)}
        <div className="flex gap-3 mt-6">
          {activeStep > 0 && (
            <button type="button" onClick={handleBack} className="px-4 py-2 rounded-lg border font-semibold text-gray-400 border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition">Back</button>
          )}
          {activeStep < steps.length - 1 && (
            <button type="button" onClick={handleNext} className="px-4 py-2 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition">Next</button>
          )}
          {activeStep === steps.length - 1 && (
            <button type="submit" className="px-4 py-2 rounded-lg bg-green-600 text-white font-bold hover:bg-green-700 transition">Generate Invoice</button>
          )}
        </div>
      </form>
      {/* Invoice List */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mb-4">
          <div className="font-bold text-blue-700 dark:text-blue-300">Invoice List</div>
          <button onClick={exportCSV} className="px-4 py-2 rounded-lg border text-gray-300 border-gray-800 font-semibold flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            <span>⬇️</span> Export CSV
          </button>
        </div>
        <input
          className="w-full rounded-lg p-2 border mb-3 border-gray-800 text-gray-300"
          placeholder="Search by filename, customer, or item..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full text-sm bg-white dark:bg-gray-900 rounded-lg">
            <thead className="bg-blue-50 dark:bg-gray-800">
              <tr>
                <th className="py-2 px-3 text-left font-bold text-blue-700 dark:text-blue-300">Bill No</th>
                <th className="py-2 px-3 text-left font-bold text-blue-700 dark:text-blue-300">Filename</th>
                <th className="py-2 px-3 text-left font-bold text-blue-700 dark:text-blue-300">Customer</th>
                <th className="py-2 px-3 text-left font-bold text-blue-700 dark:text-blue-300">Date</th>
                <th className="py-2 px-3 text-left font-bold text-blue-700 dark:text-blue-300">Download</th>
                <th className="py-2 px-3 text-left font-bold text-blue-700 dark:text-blue-300">Edit</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-gray-400 py-4">No invoices found.</td>
                </tr>
              ) : (
                filteredInvoices.map((inv, idx) => {
                  // Support both string (filename) and object
                  const filename = typeof inv === 'string' ? inv : inv.filename;
                  // Extract bill number from filename: invoice_<billNumber>_<timestamp>.pdf
                  let billNo = '-';
                  if (filename) {
                    const match = filename.match(/invoice_(\d+)_/);
                    if (match) billNo = match[1];
                  }
                  return (
                    <tr key={idx} className="hover:bg-blue-50 dark:hover:bg-gray-800 transition">
                      <td className="py-2 px-3 font-bold text-blue-700">{billNo}</td>
                      <td className="py-2 px-3 text-blue-700">{filename}</td>
                      <td className="py-2 px-3 text-blue-700">{inv.customerName || '-'}</td>
                      <td className="py-2 px-3 text-blue-700">{inv.date || '-'}</td>
                      <td className="py-2 px-3">
                        <a href={`invoices/${filename}`} target="_blank" rel="noopener noreferrer" download className="text-blue-600 hover:underline">Download</a>
                      </td>
                      <td className="py-2 px-3">
                        <button className="text-blue-600 underline" onClick={() => {
                          setDetails({
                            customerName: inv.customerName || '',
                            patientName: inv.patientName || '',
                            vehicle: inv.vehicle || '',
                            date: inv.date || new Date().toISOString().slice(0, 10),
                            notes: inv.notes || '',
                          });
                          setItems(inv.items || [{ name: '', qty: 1, price: '', tax: 0 }]);
                          setLogo(inv.logo || '');
                          setEditInvoiceId(inv._id || null);
                          setActiveStep(1);
                        }}>Edit</button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Snackbar */}
      {snackbar.open && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fadeInUp">
          {snackbar.message}
          <button className="ml-4 font-bold" onClick={() => setSnackbar({ ...snackbar, open: false })}>×</button>
        </div>
      )}
    </div>
  );
}

export default Invoices;
