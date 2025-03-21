import { axiosInstance } from './api';

export const AccountInfo = async () => {
  try {
    const response = await axiosInstance.get('/api/Account/info');
    return response.data; // JSON trả về từ server
  } catch (error) {
    throw error;
  }
};
