import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Placeholder icon fix for react-leaflet
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Dummy data for demonstration
const dummyExpenses = [
  {
    id: 1,
    amount: 1200,
    category: 'Groceries',
    date: '2024-06-01',
    lat: 28.6139,
    lng: 77.209,
    note: 'Supermarket',
  },
  {
    id: 2,
    amount: 500,
    category: 'Transport',
    date: '2024-06-02',
    lat: 28.7041,
    lng: 77.1025,
    note: 'Metro',
  },
];

const ExpenseMap = ({ expenses = dummyExpenses }) => {
  const [mapCenter, setMapCenter] = useState([28.6139, 77.209]); // Default: New Delhi

  useEffect(() => {
    if (expenses.length > 0) {
      setMapCenter([expenses[0].lat, expenses[0].lng]);
    }
  }, [expenses]);

  return (
    <div className="rounded-2xl shadow-xl bg-white/40 backdrop-blur-md p-4 w-full max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Expense Map</h2>
      <MapContainer center={mapCenter} zoom={11} style={{ height: '400px', width: '100%' }} className="rounded-xl">
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {expenses.map(exp => (
          <Marker key={exp.id} position={[exp.lat, exp.lng]}>
            <Popup>
              <div className="text-sm">
                <div><span className="font-semibold">₹{exp.amount}</span> - {exp.category}</div>
                <div>{exp.date}</div>
                <div className="text-gray-500">{exp.note}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <div className="mt-4 text-gray-600 text-sm">
        <span>Tip: Click on a marker to see expense details. Filter and clustering coming soon!</span>
      </div>
    </div>
  );
};

export default ExpenseMap;
