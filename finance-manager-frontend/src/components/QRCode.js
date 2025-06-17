import React from 'react';
import QRCodeLib from 'qrcode.react';

export default function QRCode({ value, size = 128, className = '' }) {
  return (
    <div className={className}>
      <QRCodeLib value={value} size={size} bgColor="#fff" fgColor="#1976d2" level="Q" includeMargin />
    </div>
  );
}
