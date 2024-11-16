import { env } from '../config/env';

const handleApiError = (error: any, apiName: string) => {
  console.error(`${apiName} API error:`, error);
  throw new Error(`${apiName} request failed: ${error.message}`);
};

export const fetchPageSpeedInsights = async (url: string) => {
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
    url
  )}&key=${env.GOOGLE_PAGESPEED_API_KEY}&strategy=mobile&category=performance&category=seo&category=best-practices&category=accessibility`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'PageSpeed API request failed');
    }
    return await response.json();
  } catch (error) {
    handleApiError(error, 'PageSpeed');
  }
};

export const fetchSearchConsoleData = async (url: string, accessToken: string) => {
  const today = new Date();
  const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
  
  const apiUrl = 'https://www.googleapis.com/webmasters/v3/sites/' + 
    encodeURIComponent(url) + '/searchAnalytics/query';
  
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startDate: thirtyDaysAgo.toISOString().split('T')[0],
        endDate: today.toISOString().split('T')[0],
        dimensions: ['query'],
        rowLimit: 10,
        aggregationType: 'auto'
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Search Console API request failed');
    }
    return await response.json();
  } catch (error) {
    handleApiError(error, 'Search Console');
  }
};