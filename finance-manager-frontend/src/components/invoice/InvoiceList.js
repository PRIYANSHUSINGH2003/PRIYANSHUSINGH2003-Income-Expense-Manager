import React, { useState } from 'react';
import Modal from '../Modal';
import InvoicePreview from './InvoicePreview';
import QRCode from '../QRCode';
import Barcode from '../Barcode';

// Mock data for demonstration
const mockInvoices = [
  {
    id: 'hospital-1',
    template: 'hospital',
    fields: {
      patientName: 'John Doe',
      doctor: 'Dr. Smith',
      service: 'Surgery',
      amount: 12000,
    },
  },
  {
    id: 'auto-2',
    template: 'auto',
    fields: {
      customerName: 'Jane Roe',
      vehicle: 'Honda Civic',
      service: 'Oil Change',
      amount: 1500,
    },
  },
];

const TEMPLATES = {
  hospital: 'Hospital',
  auto: 'Auto',
  retail: 'Retail',
  shop: 'Shop',
};

function InvoiceList() {
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-xl mt-8">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-200">Invoices</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full rounded-xl overflow-hidden text-left shadow-xl">
          <thead>
            <tr className="bg-gradient-to-r from-indigo-200 via-blue-100 to-white/80 dark:from-indigo-900 dark:via-blue-900 dark:to-gray-900/80">
              <th className="px-6 py-3 font-bold text-indigo-700 dark:text-indigo-200">Template</th>
              <th className="px-6 py-3 font-bold text-indigo-700 dark:text-indigo-200">Key Info</th>
              <th className="px-6 py-3 font-bold text-indigo-700 dark:text-indigo-200">QR/Barcode</th>
              <th className="px-6 py-3 font-bold text-indigo-700 dark:text-indigo-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockInvoices.map((inv) => (
              <tr key={inv.id} className="bg-white/80 dark:bg-gray-800/80 border-b border-gray-100 dark:border-gray-800">
                <td className="px-6 py-3 font-semibold">{TEMPLATES[inv.template]}</td>
                <td className="px-6 py-3">
                  {Object.entries(inv.fields).map(([k, v]) => (
                    <div key={k} className="text-sm text-gray-700 dark:text-gray-200">
                      <span className="font-semibold capitalize">{k.replace(/([A-Z])/g, ' $1')}:</span> {v}
                    </div>
                  ))}
                </td>
                <td className="px-6 py-3">
                  <div className="flex gap-2 items-center">
                    <QRCode value={JSON.stringify(inv)} size={32} />
                    <Barcode value={inv.id} width={1} height={24} />
                  </div>
                </td>
                <td className="px-6 py-3">
                  <button
                    className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-bold shadow hover:bg-indigo-700 transition"
                    onClick={() => setSelectedInvoice(inv)}
                  >
                    Preview
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Preview Modal */}
      <Modal open={!!selectedInvoice} onClose={() => setSelectedInvoice(null)}>
        {selectedInvoice && (
          <InvoicePreview invoice={selectedInvoice} />
        )}
      </Modal>
    </div>
  );
}

export default InvoiceList;
