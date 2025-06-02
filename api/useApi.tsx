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

// Lấy chi tiết video theo id
export const getVideoHistoryById = async (id: string | number) => {
  try {
    const response = await axiosInstance.get(`/api/VideoHistory/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Lấy chi tiết bài viết theo id
export const getPostById = async (id: string | number) => {
  try {
    const response = await axiosInstance.get(`/api/News/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

