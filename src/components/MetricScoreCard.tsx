import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface MetricScoreCardProps {
  title: string;
  score: number;
  status: 'critical' | 'warning' | 'good' | 'excellent';
  recommendations: string[];
}

const MetricScoreCard: React.FC<MetricScoreCardProps> = ({
  title,
  score,
  status,
  recommendations
}) => {
  const statusConfig = {
    critical: {
      icon: XCircle,
      color: 'text-red-500',
      bg: 'bg-red-50',
      border: 'border-red-200'
    },
    warning: {
      icon: AlertTriangle,
      color: 'text-yellow-500',
      bg: 'bg-yellow-50',
      border: 'border-yellow-200'
    },
    good: {
      icon: AlertCircle,
      color: 'text-blue-500',
      bg: 'bg-blue-50',
      border: 'border-blue-200'
    },
    excellent: {
      icon: CheckCircle,
      color: 'text-green-500',
      bg: 'bg-green-50',
      border: 'border-green-200'
    }
  };

  const StatusIcon = statusConfig[status].icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-xl border ${statusConfig[status].border} ${statusConfig[status].bg}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <StatusIcon className={`w-6 h-6 ${statusConfig[status].color}`} />
      </div>
      
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Score</span>
          <span className={`font-bold ${statusConfig[status].color}`}>
            {score.toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${statusConfig[status].color.replace('text', 'bg')}`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Recommendations:</h4>
        <ul className="space-y-2">
          {recommendations.map((rec, index) => (
            <li key={index} className="text-sm flex items-start space-x-2">
              <span className="text-gray-600">•</span>
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default MetricScoreCard;