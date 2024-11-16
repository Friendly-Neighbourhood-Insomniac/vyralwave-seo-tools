export interface PageSpeedInsightsResponse {
  lighthouseResult: {
    categories: {
      performance: { score: number };
      accessibility: { score: number };
      'best-practices': { score: number };
      seo: { score: number };
    };
    audits: {
      [key: string]: {
        score: number;
        displayValue?: string;
        description?: string;
      };
    };
  };
  loadingExperience: {
    metrics: {
      [key: string]: {
        percentile: number;
        distributions: Array<{ min: number; max: number; proportion: number }>;
      };
    };
  };
}

export interface SearchConsoleResponse {
  rows: Array<{
    keys: string[];
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  }>;
}