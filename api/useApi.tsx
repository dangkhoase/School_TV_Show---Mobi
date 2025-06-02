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

export const Lives = async () => {
  try {
    const response = await axiosInstance.get('/api/Schedule/timeline'); 
    return response.data; // JSON trả về từ server
  } catch (error) {
    throw error;
  }
};
export const LivesById = async (id: string | number) => {
  try {
    const response = await axiosInstance.get(`/api/Schedule/by-channel-and-date?channelId=${id}&date=${new Date().toISOString().split('T')[0]}`);
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

// Lấy comments của video
export const getVideoComments = async (videoId: number) => {
  try {
    const response = await axiosInstance.get(`/api/Comment/video/${videoId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Gửi comment mới
export const postComment = async (data: { content: string; videoHistoryID: number }) => {
  try {
    const response = await axiosInstance.post('/api/Comment', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Lấy chi tiết event theo id
export const getEventById = async (id: string | number) => {
  try {
    const response = await axiosInstance.get(`/api/Schedule/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Lấy danh sách thông báo
export const getNotifications = async (page: number = 1, pageSize: number = 20) => {
  try {
    const response = await axiosInstance.get(`/api/notifications/my?page=${page}&pageSize=${pageSize}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Lấy danh sách video với phân trang
export const getAllVideoHistory = async (page: number = 1, pageSize: number = 10) => {
  try {
    const response = await axiosInstance.get(`/api/VideoHistory/all?page=${page}&pageSize=${pageSize}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Lấy danh sách video theo kênh
export const getVideoHistoryByChannel = async (channelId: number, page: number = 1, pageSize: number = 10) => {
  try {
    const response = await axiosInstance.get(`/api/VideoHistory/by-channel/${channelId}?page=${page}&pageSize=${pageSize}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

