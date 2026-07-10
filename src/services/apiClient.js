import axios from 'axios';

// Base API URL configuration. This can be configured via environment variables.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach Auth Token if exists
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Global Error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific status codes (e.g. 401 Unauthorized)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('access_token');
      // Force reload to kick user back to login via AuthGuard
      if (window.location.pathname !== '/' && window.location.pathname !== '/login') {
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
