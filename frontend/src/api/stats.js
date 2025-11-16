import axiosClient from './axiosClient';

export const statsAPI = {
  // Get overview stats
  getOverview: () => axiosClient.get('/stats/overview'),
  
  // Get donations by category
  getDonationsByCategory: () => axiosClient.get('/stats/donations/category'),
  
  // Get requests by status
  getRequestsByStatus: () => axiosClient.get('/stats/requests/status'),
  
  // Get requests by priority
  getRequestsByPriority: () => axiosClient.get('/stats/requests/priority'),
  
  // Get volunteers by availability
  getVolunteersByAvailability: () => axiosClient.get('/stats/volunteers/availability'),
  
  // Get donation amount by category
  getDonationAmountByCategory: () => axiosClient.get('/stats/donations/amount'),
  
  // Get volunteers by skills
  getVolunteersBySkills: () => axiosClient.get('/stats/volunteers/skills'),
};

