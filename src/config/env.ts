interface EnvConfig {
  GOOGLE_CLIENT_ID: string;
  GOOGLE_PAGESPEED_API_KEY: string;
}

export const env: EnvConfig = {
  GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  GOOGLE_PAGESPEED_API_KEY: import.meta.env.VITE_GOOGLE_PAGESPEED_API_KEY,
};