import React, { useState } from 'react';
import Modal from '../Modal';
import QRCode from '../QRCode';
import Barcode from '../Barcode';

const TEMPLATES = [
  { label: 'Hospital', value: 'hospital' },
  { label: 'Auto', value: 'auto' },
  { label: 'Retail', value: 'retail' },
  { label: 'Shop', value: 'shop' },
];

const DEFAULT_FIELDS = {
  hospital: [
    { label: 'Patient Name', key: 'patientName' },
    { label: 'Doctor', key: 'doctor' },
    { label: 'Service', key: 'service' },
    { label: 'Amount', key: 'amount', type: 'number' },
  ],
  auto: [
    { label: 'Customer Name', key: 'customerName' },
    { label: 'Vehicle', key: 'vehicle' },
    { label: 'Service', key: 'service' },
    { label: 'Amount', key: 'amount', type: 'number' },
  ],
  retail: [
    { label: 'Customer Name', key: 'customerName' },
    { label: 'Product', key: 'product' },
    { label: 'Quantity', key: 'quantity', type: 'number' },
    { label: 'Amount', key: 'amount', type: 'number' },
  ],
  shop: [
    { label: 'Customer Name', key: 'customerName' },
    { label: 'Item', key: 'item' },
    { label: 'Quantity', key: 'quantity', type: 'number' },
    { label: 'Amount', key: 'amount', type: 'number' },
  ],
};

function InvoiceGenerator() {
  const [template, setTemplate] = useState('hospital');
  const [fields, setFields] = useState({});
  const [showPreview, setShowPreview] = useState(false);

  const handleFieldChange = (key, value) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  const handleExportPDF = () => {
    window.print(); // Simple print for demo; replace with PDF export lib for production
  };

  const templateFields = DEFAULT_FIELDS[template] || [];
  const invoiceId = `${template}-${Date.now()}`;
  const qrValue = JSON.stringify({ template, ...fields });

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-xl mt-8">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-200">Generate Invoice</h2>
      {/* Template Selection */}
      <div className="mb-6 flex gap-3">
        {TEMPLATES.map((tpl) => (
          <button
            key={tpl.value}
            className={`px-4 py-2 rounded-lg font-semibold border transition shadow-sm ${template === tpl.value ? 'bg-indigo-600 text-white border-indigo-700' : 'bg-white dark:bg-gray-800 text-indigo-700 dark:text-indigo-200 border-gray-300 dark:border-gray-700'}`}
            onClick={() => { setTemplate(tpl.value); setFields({}); }}
          >
            {tpl.label}
          </button>
        ))}
      </div>
      {/* Dynamic Form */}
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {templateFields.map((field) => (
          <div key={field.key}>
            <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">{field.label}</label>
            <input
              type={field.type || 'text'}
              className="w-full px-4 py-2 rounded-xl border border-indigo-200 dark:border-indigo-700 bg-white dark:bg-gray-800 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 outline-none transition shadow"
              value={fields[field.key] || ''}
              onChange={e => handleFieldChange(field.key, e.target.value)}
              required
            />
          </div>
        ))}
      </form>
      {/* QR/Barcode */}
      <div className="flex gap-8 items-center mb-6">
        <div>
          <div className="text-xs text-gray-500 mb-1">QR Code</div>
          <QRCode value={qrValue} size={64} />
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Barcode</div>
          <Barcode value={invoiceId} width={2} height={32} />
        </div>
      </div>
      {/* Actions */}
      <div className="flex gap-4">
        <button
          className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-bold shadow hover:bg-indigo-700 transition"
          onClick={() => setShowPreview(true)}
          type="button"
        >
          Preview
        </button>
        <button
          className="px-6 py-2 rounded-lg bg-green-600 text-white font-bold shadow hover:bg-green-700 transition"
          onClick={handleExportPDF}
          type="button"
        >
          Export PDF
        </button>
      </div>
      {/* Preview Modal */}
      <Modal open={showPreview} onClose={() => setShowPreview(false)}>
        <div className="p-8 bg-white dark:bg-gray-900 rounded-2xl max-w-lg mx-auto">
          <h3 className="text-xl font-bold mb-4 text-indigo-700 dark:text-indigo-200">Invoice Preview</h3>
          <div className="mb-4">
            <div className="font-semibold mb-2">Template: {TEMPLATES.find(t => t.value === template)?.label}</div>
            {templateFields.map((field) => (
              <div key={field.key} className="mb-1">
                <span className="font-semibold text-gray-700 dark:text-gray-200">{field.label}:</span> <span className="text-gray-800 dark:text-gray-100">{fields[field.key]}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-8 items-center">
            <QRCode value={qrValue} size={64} />
            <Barcode value={invoiceId} width={2} height={32} />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default InvoiceGenerator;
