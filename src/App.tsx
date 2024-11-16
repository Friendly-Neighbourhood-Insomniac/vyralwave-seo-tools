import React, { useState } from 'react';
import { Activity, Globe, Zap, Search, Smartphone } from 'lucide-react';
import DashboardLayout from './components/DashboardLayout';
import MetricCard from './components/MetricCard';
import AnalysisForm from './components/AnalysisForm';
import AnalysisResults from './components/AnalysisResults';
import { PageSpeedInsightsResponse, SearchConsoleResponse } from './types/api';

interface AnalysisData {
  url: string;
  keywords: string;
  pageSpeedData: PageSpeedInsightsResponse;
  searchConsoleData: SearchConsoleResponse;
}

function App() {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);

  const handleAnalysis = (data: AnalysisData) => {
    setAnalysisData(data);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">SEO Analysis Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Analyze your website's SEO performance and get detailed insights
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Start New Analysis</h2>
          <AnalysisForm onSubmit={handleAnalysis} />
        </div>

        {analysisData ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <MetricCard
                title="Health Score"
                value={`${Math.round(analysisData.pageSpeedData.lighthouseResult.categories['best-practices'].score * 100)}%`}
                icon={<Activity className="w-6 h-6" />}
                color="green"
              />
              <MetricCard
                title="SEO Score"
                value={`${Math.round(analysisData.pageSpeedData.lighthouseResult.categories.seo.score * 100)}/100`}
                icon={<Search className="w-6 h-6" />}
                color="blue"
              />
              <MetricCard
                title="Performance"
                value={`${Math.round(analysisData.pageSpeedData.lighthouseResult.categories.performance.score * 100)}/100`}
                icon={<Zap className="w-6 h-6" />}
                color="yellow"
              />
              <MetricCard
                title="Mobile Score"
                value={`${Math.round(analysisData.pageSpeedData.lighthouseResult.categories.accessibility.score * 100)}/100`}
                icon={<Smartphone className="w-6 h-6" />}
                color="green"
              />
            </div>

            <AnalysisResults
              pageSpeedData={analysisData.pageSpeedData}
              searchConsoleData={analysisData.searchConsoleData}
            />
          </>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Tips</h2>
              <div className="space-y-4">
                {[
                  'Optimize your meta descriptions for better click-through rates',
                  'Ensure all images have descriptive alt text',
                  'Improve mobile responsiveness for better rankings',
                  'Create high-quality backlinks from reputable sources'
                ].map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-sm font-medium text-indigo-600">
                        {index + 1}
                      </span>
                    </div>
                    <p className="text-gray-600">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Globe className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">Start Your First Analysis</h3>
                  <p className="mt-2 text-gray-500">
                    Enter a URL above to get detailed SEO insights and recommendations
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default App;