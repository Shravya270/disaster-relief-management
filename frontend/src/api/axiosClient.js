import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const axiosClient = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    // Backend returns { success, message, data, error }
    // Return the data property if it exists, otherwise return the full response
    return response.data?.data !== undefined ? response.data.data : response.data;
  },
  (error) => {
    // Handle network errors
    if (!error.response) {
      const message = 'Network Error: Unable to connect to the server. Please check if the backend is running.';
      toast.error(message);
      console.error('Network Error:', error.message);
      return Promise.reject(new Error(message));
    }
    
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    toast.error(message);
    return Promise.reject(error);
  }
);

export default axiosClient;

