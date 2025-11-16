import axiosClient from './axiosClient';

export const volunteerAPI = {
  // Create volunteer
  create: (data) => axiosClient.post('/volunteers', data),
  
  // Get all volunteers
  getAll: () => axiosClient.get('/volunteers'),
  
  // Get single volunteer
  getById: (id) => axiosClient.get(`/volunteers/${id}`),
  
  // Update volunteer
  update: (id, data) => axiosClient.put(`/volunteers/${id}`, data),
  
  // Delete volunteer
  delete: (id) => axiosClient.delete(`/volunteers/${id}`),
};

