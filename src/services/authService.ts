import api from './api';

export const registerUser = async (data: { name: string; email: string; password: string }) => {
  return api.post('/users/register', data);
};

export const loginUser = async (data: { email: string; password: string }) => {
  return api.post('/users/login', data);
};

// export const sendPasswordResetLink = async (data: { email: string }) => {
//   return api.post('/users/forgot-password', data); 
// };

// export const resetPassword = async ({ token, password }: { token: string; password: string }) => {
//   const response = await axios.post('/api/reset-password', { token, password });
//   return response.data;
// };

// export const validateResetToken = async (token: string) => {
//   const response = await axios.get(`/api/validate-reset-token/${token}`);
//   return response.data;
// };
