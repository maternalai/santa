export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';

export const ROUTES = {
  HOME: '/',
  MATCHES: '/matches',
  MYBETS: '/mybets',
  PROFILE: '/profile',
  STATISTICS: '/statistics',
  LOGIN: '/login'
};

export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user'
}; 