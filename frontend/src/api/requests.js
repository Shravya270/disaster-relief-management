import axiosClient from './axiosClient';

export const requestAPI = {
  // Create resource request
  create: (data) => axiosClient.post('/requests', data),
  
  // Get all requests
  getAll: () => axiosClient.get('/requests'),
  
  // Get single request
  getById: (id) => axiosClient.get(`/requests/${id}`),
  
  // Update request
  update: (id, data) => axiosClient.put(`/requests/${id}`, data),
  
  // Delete request
  delete: (id) => axiosClient.delete(`/requests/${id}`),
  
  // Assign volunteer
  assignVolunteer: (data) => axiosClient.post('/requests/assign', data),
  
  // Unassign volunteer
  unassignVolunteer: (data) => axiosClient.post('/requests/unassign', data),
  
  // Auto assign
  autoAssign: (data) => axiosClient.post('/requests/auto-assign', data),
};

