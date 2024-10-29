import React from 'react';

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  color: string;
  value: number;
  label: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  color,
  value,
  label,
  className = '', // Agrega un valor por defecto para evitar 'undefined'
}) => (
  <div
    className={`flex flex-col items-center p-6 text-white rounded-lg shadow-lg transition-transform transform hover:scale-105 ${color} ${className}`}
  >
    <h1 className="mb-2 text-4xl font-bold">{value}</h1>
    <p className="text-lg font-medium">{label}</p>
  </div>
);

export default StatCard;
