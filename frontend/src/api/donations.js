import axiosClient from './axiosClient';

export const donationAPI = {
  // Create donation
  create: (data) => axiosClient.post('/donations', data),
  
  // Get all donations
  getAll: () => axiosClient.get('/donations'),
  
  // Get single donation
  getById: (id) => axiosClient.get(`/donations/${id}`),
  
  // Update donation
  update: (id, data) => axiosClient.put(`/donations/${id}`, data),
  
  // Delete donation
  delete: (id) => axiosClient.delete(`/donations/${id}`),
};

