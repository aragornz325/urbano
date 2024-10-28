import React from 'react';

interface StatCardProps {
  color: string;
  value: number;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ color, value, label }) => (
  <div
    className={`flex flex-col items-center p-6 text-white rounded-lg shadow-lg transition-transform transform ${color} hover:scale-105`}
  >
    <h1 className="mb-2 text-4xl font-bold">{value}</h1>
    <p className="text-lg font-medium">{label}</p>
  </div>
);

export default StatCard;
