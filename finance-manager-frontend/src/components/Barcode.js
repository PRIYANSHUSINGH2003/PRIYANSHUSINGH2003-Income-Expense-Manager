import React from 'react';
import Barcode from 'react-barcode';

export default function BarcodeComponent({ value, className = '' }) {
  return (
    <div className={className}>
      <Barcode value={value} height={40} width={1.5} displayValue={false} background="#fff" lineColor="#1976d2" />
    </div>
  );
}
