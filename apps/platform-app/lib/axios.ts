import axios from 'axios';

// The base URL should be configured via environment variables.
// Defaulting to a local development backend if not provided.
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:400/api',
  withCredentials: true, // Crucial for sending/receiving HTTP-only cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// We can add interceptors here if we need to refresh tokens or handle global errors.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optionally handle 401 Unauthorized globally
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
