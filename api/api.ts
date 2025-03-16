// services/authApi.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
 
// ---- (2) Tạo instance Axios ----
export const axiosInstance = axios.create({
  baseURL: 'https://schooltv.azurewebsites.net', // Thay đổi thành URL gốc của bạn
  timeout: 5000,
});

// ---- (3) Thiết lập Interceptor để tự động thêm token vào header ----
axiosInstance.interceptors.request.use(
  async (config) => {
    // Lấy token từ AsyncStorage
    const token = await AsyncStorage.getItem('token');
    if (token) {
      // Gắn token vào header Authorization
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
 