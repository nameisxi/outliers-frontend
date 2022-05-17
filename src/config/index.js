
export const CONFIGS = {
    ENV: process.env.NODE_ENV,
    HOST: process.env.NODE_ENV === 'production' ? 'https://api.getoutliers.com' : 'http://localhost:8000',
    CLIENT: process.env.NODE_ENV === 'production' ? 'https://getoutliers.com' : 'http://localhost:3000',
};
  