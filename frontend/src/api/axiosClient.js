import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const axiosClient = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

/* -----------------------------
   REQUEST INTERCEPTOR
   (Attach JWT token automatically)
-------------------------------- */
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/* -----------------------------
   RESPONSE INTERCEPTOR
   (Handle 401 globally)
-------------------------------- */
axiosClient.interceptors.response.use(
  (response) => {
    return response.data?.data !== undefined
      ? response.data.data
      : response.data;
  },
  (error) => {
    // If backend is offline
    if (!error.response) {
      const message =
        'Network Error: Unable to connect to the server. Please check if the backend is running.';
      toast.error(message);
      return Promise.reject(new Error(message));
    }

    // Handle unauthorized (expired or missing token)
    if (error.response.status === 401) {
      toast.error('Session expired. Please login again.');

      // Clear invalid token
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // Redirect to login
      window.location.href = '/login';
      return Promise.reject(error);
    }

    const message =
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message ||
      'Something went wrong';

    toast.error(message);
    return Promise.reject(error);
  }
);

export default axiosClient;
