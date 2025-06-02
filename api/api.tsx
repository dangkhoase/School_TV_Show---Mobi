// services/authApi.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
export const axiosInstance = axios.create({
  baseURL: 'https://tvshowbe.azurewebsites.net', // Thay đổi thành URL gốc của bạn
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    // Đảm bảo chờ AsyncStorage.getItem() trả về đúng giá trị
    const jsonValue = await AsyncStorage.getItem('userToken');
    if (jsonValue) {
      const token = JSON.parse(jsonValue); // Chuyển chuỗi JSON thành đối tượng
      config.headers.Authorization = `Bearer ${token}`;
    } 
    return config;
  },
  (error) => Promise.reject(error)
);
