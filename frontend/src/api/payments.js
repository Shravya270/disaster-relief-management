import axiosClient from './axiosClient';

export const paymentAPI = {
  // Create payment intent
  createIntent: (data) => axiosClient.post('/payments/create-intent', data),
};

