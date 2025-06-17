import React from 'react';
import QRCode from '../QRCode';
import Barcode from '../Barcode';

const TEMPLATES = {
  hospital: 'Hospital',
  auto: 'Auto',
  retail: 'Retail',
  shop: 'Shop',
};

function InvoicePreview({ invoice }) {
  if (!invoice) return null;
  const { template, fields, id } = invoice;
  const qrValue = JSON.stringify(invoice);

  return (
    <div className="p-8 bg-white dark:bg-gray-900 rounded-2xl max-w-lg mx-auto print:bg-white print:text-black">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-indigo-700 dark:text-indigo-200">Invoice Preview</h3>
        <span className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200 font-semibold text-sm">
          {TEMPLATES[template]}
        </span>
      </div>
      <div className="mb-4">
        {Object.entries(fields).map(([k, v]) => (
          <div key={k} className="mb-1">
            <span className="font-semibold text-gray-700 dark:text-gray-200 capitalize">{k.replace(/([A-Z])/g, ' $1')}:</span> <span className="text-gray-800 dark:text-gray-100">{v}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-8 items-center mb-4">
        <div>
          <div className="text-xs text-gray-500 mb-1">QR Code</div>
          <QRCode value={qrValue} size={64} />
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Barcode</div>
          <Barcode value={id || 'invoice'} width={2} height={32} />
        </div>
      </div>
      <div className="mt-6 text-right">
        <button
          className="px-6 py-2 rounded-lg bg-green-600 text-white font-bold shadow hover:bg-green-700 transition print:hidden"
          onClick={() => window.print()}
        >
          Export PDF
        </button>
      </div>
    </div>
  );
}

export default InvoicePreview;
