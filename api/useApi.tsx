import { axiosInstance } from './api';

export const AccountInfo = async () => {
  try {
    const response = await axiosInstance.get('/api/accounts/info');
    return response.data; // JSON trả về từ server
  } catch (error) {
    throw error;
  }
};

export const PostNews = async () => {
  try {
    const response = await axiosInstance.get('/api/News/all');
    return response.data; // JSON trả về từ server
  } catch (error) {
    throw error;
  }
};
export const Schedules = async () => {
  try {
    const response = await axiosInstance.get('/api/Schedule/timeline');
    return response.data; // JSON trả về từ server
  } catch (error) {
    throw error;
  }
};
export const NewsCombined = async () => {
  try {
    const response = await axiosInstance.get('/api/News/combined?page=1&pageSize=3');
    return response.data; // JSON trả về từ server
  } catch (error) {
    throw error;
  }
};
export const VideoHistoryActive = async () => {
  try {
    const response = await axiosInstance.get('/api/VideoHistory/active?page=1&pageSize=3');
    return response.data; // JSON trả về từ server
  } catch (error) {
    throw error;
  }
};

