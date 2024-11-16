import React from 'react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { PageSpeedInsightsResponse, SearchConsoleResponse } from '../types/api';
import MetricScoreCard from './MetricScoreCard';
import { scorePerformanceMetrics, scoreSEOMetrics, scoreSearchPerformance } from '../utils/metricScoring';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface AnalysisResultsProps {
  pageSpeedData: PageSpeedInsightsResponse;
  searchConsoleData: SearchConsoleResponse;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  pageSpeedData,
  searchConsoleData
}) => {
  const performanceMetrics = scorePerformanceMetrics(pageSpeedData);
  const seoMetrics = scoreSEOMetrics(pageSpeedData);
  const searchMetrics = scoreSearchPerformance(searchConsoleData);

  const searchData = searchConsoleData.rows.slice(0, 7);
  const chartData = {
    labels: searchData.map(row => row.keys[0]),
    datasets: [
      {
        label: 'Clicks',
        data: searchData.map(row => row.clicks),
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
      },
      {
        label: 'Impressions',
        data: searchData.map(row => row.impressions),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
      }
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricScoreCard
          title="Performance Score"
          score={performanceMetrics.score}
          status={performanceMetrics.status}
          recommendations={performanceMetrics.recommendations}
        />
        <MetricScoreCard
          title="SEO Score"
          score={seoMetrics.score}
          status={seoMetrics.status}
          recommendations={seoMetrics.recommendations}
        />
        <MetricScoreCard
          title="Search Performance"
          score={searchMetrics.score}
          status={searchMetrics.status}
          recommendations={searchMetrics.recommendations}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Search Performance Trends</h2>
        <div className="h-80">
          <Line 
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
                title: {
                  display: true,
                  text: 'Search Console Performance'
                }
              }
            }}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Top Performing Keywords</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Keyword
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Clicks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Impressions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CTR
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {searchData.map((row, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {row.keys[0]}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {row.clicks}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {row.impressions}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {(row.ctr * 100).toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default AnalysisResults;