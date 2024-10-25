// client/apiClient.ts
import axios, { InternalAxiosRequestConfig } from 'axios';

// Set up Axios instance with Authorization header
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add Authorization token to requests
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token'); // Or use cookies if needed
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
