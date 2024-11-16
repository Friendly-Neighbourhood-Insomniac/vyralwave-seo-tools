import { PageSpeedInsightsResponse, SearchConsoleResponse } from '../types/api';

interface MetricScore {
  score: number;
  status: 'critical' | 'warning' | 'good' | 'excellent';
  recommendations: string[];
}

export const scorePerformanceMetrics = (data: PageSpeedInsightsResponse): MetricScore => {
  const score = data.lighthouseResult.categories.performance.score * 100;
  
  if (score < 50) {
    return {
      score,
      status: 'critical',
      recommendations: [
        'Implement lazy loading for images and videos',
        'Minimize render-blocking resources',
        'Enable text compression',
        'Consider using a CDN for faster content delivery'
      ]
    };
  } else if (score < 70) {
    return {
      score,
      status: 'warning',
      recommendations: [
        'Optimize image formats and sizes',
        'Minimize main-thread work',
        'Reduce JavaScript execution time'
      ]
    };
  } else if (score < 90) {
    return {
      score,
      status: 'good',
      recommendations: [
        'Fine-tune server response times',
        'Optimize critical rendering path'
      ]
    };
  }
  
  return {
    score,
    status: 'excellent',
    recommendations: [
      'Monitor performance metrics regularly',
      'Consider implementing performance budgets'
    ]
  };
};

export const scoreSEOMetrics = (data: PageSpeedInsightsResponse): MetricScore => {
  const score = data.lighthouseResult.categories.seo.score * 100;
  
  if (score < 50) {
    return {
      score,
      status: 'critical',
      recommendations: [
        'Add meta descriptions to all pages',
        'Fix missing title tags',
        'Ensure content is mobile-friendly',
        'Fix crawlability issues'
      ]
    };
  } else if (score < 70) {
    return {
      score,
      status: 'warning',
      recommendations: [
        'Improve meta descriptions quality',
        'Optimize header structure',
        'Add alt text to images'
      ]
    };
  } else if (score < 90) {
    return {
      score,
      status: 'good',
      recommendations: [
        'Enhance internal linking structure',
        'Optimize URL structure'
      ]
    };
  }
  
  return {
    score,
    status: 'excellent',
    recommendations: [
      'Monitor keyword rankings',
      'Keep content fresh and updated'
    ]
  };
};

export const scoreSearchPerformance = (data: SearchConsoleResponse): MetricScore => {
  const avgCTR = data.rows.reduce((acc, row) => acc + row.ctr, 0) / data.rows.length * 100;
  
  if (avgCTR < 1) {
    return {
      score: avgCTR,
      status: 'critical',
      recommendations: [
        'Rewrite meta titles for better click-through rates',
        'Improve meta descriptions to be more compelling',
        'Target less competitive keywords initially',
        'Create more engaging content titles'
      ]
    };
  } else if (avgCTR < 3) {
    return {
      score: avgCTR,
      status: 'warning',
      recommendations: [
        'A/B test meta descriptions',
        'Focus on emotional triggers in titles',
        'Add rich snippets where applicable'
      ]
    };
  } else if (avgCTR < 5) {
    return {
      score: avgCTR,
      status: 'good',
      recommendations: [
        'Optimize for featured snippets',
        'Include numbers and statistics in titles'
      ]
    };
  }
  
  return {
    score: avgCTR,
    status: 'excellent',
    recommendations: [
      'Maintain current meta title/description strategy',
      "Monitor competitors' CTR changes"
    ]
  };
};