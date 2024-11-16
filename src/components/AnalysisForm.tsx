import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Search, Loader2 } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import { fetchPageSpeedInsights, fetchSearchConsoleData } from '../services/api';

interface FormData {
  url: string;
  keywords: string;
}

interface AnalysisFormProps {
  onSubmit: (data: any) => void;
}

export default function AnalysisForm({ onSubmit }: AnalysisFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, setError } = useForm<FormData>();

  const login = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/webmasters.readonly',
    onSuccess: async (response) => {
      const formData = await handleSubmit(async (data) => data)();
      if (formData) {
        await handleAnalysis(formData, response.access_token);
      }
    },
    onError: (error) => {
      console.error('Google Login Error:', error);
      setError('url', {
        type: 'manual',
        message: 'Failed to authenticate with Google. Please try again.'
      });
    }
  });

  const handleAnalysis = async (data: FormData, accessToken: string) => {
    setIsLoading(true);
    try {
      const [pageSpeedData, searchConsoleData] = await Promise.all([
        fetchPageSpeedInsights(data.url),
        fetchSearchConsoleData(data.url, accessToken)
      ]);

      onSubmit({
        url: data.url,
        keywords: data.keywords,
        pageSpeedData,
        searchConsoleData
      });
    } catch (error: any) {
      setError('url', {
        type: 'manual',
        message: error.message || 'Failed to analyze website. Please check your URL and try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onFormSubmit = (data: FormData) => {
    login();
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700">
          Website URL
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            type="url"
            id="url"
            {...register('url', { 
              required: 'URL is required',
              pattern: {
                value: /^https?:\/\/.+/,
                message: 'Please enter a valid URL starting with http:// or https://'
              }
            })}
            className="block w-full rounded-md border-gray-300 pl-4 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-12"
            placeholder="https://example.com"
            disabled={isLoading}
          />
        </div>
        {errors.url && (
          <p className="mt-1 text-sm text-red-600">{errors.url.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="keywords" className="block text-sm font-medium text-gray-700">
          Target Keywords (comma separated)
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="keywords"
            {...register('keywords', { required: 'Keywords are required' })}
            className="block w-full rounded-md border-gray-300 pl-4 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-12"
            placeholder="seo, digital marketing, web analytics"
            disabled={isLoading}
          />
        </div>
        {errors.keywords && (
          <p className="mt-1 text-sm text-red-600">{errors.keywords.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <Search className="w-5 h-5 mr-2" />
            Analyze Website
          </>
        )}
      </button>
    </form>
  );
}