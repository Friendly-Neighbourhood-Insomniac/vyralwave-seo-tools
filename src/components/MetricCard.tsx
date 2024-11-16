import React from 'react';
import { motion } from 'framer-motion';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  color?: 'green' | 'yellow' | 'red' | 'blue';
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  icon, 
  trend = 'neutral',
  color = 'blue'
}) => {
  const colorClasses = {
    green: 'bg-green-50 text-green-700 border-green-200',
    yellow: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    red: 'bg-red-50 text-red-700 border-red-200',
    blue: 'bg-indigo-50 text-indigo-700 border-indigo-200'
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`p-6 rounded-xl border ${colorClasses[color]} transition-all duration-300`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-medium opacity-80">{title}</h3>
          <p className="text-2xl font-bold mt-2">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export default MetricCard;