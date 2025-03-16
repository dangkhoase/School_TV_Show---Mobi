import { axiosInstance } from './api';

// ---- (1) Khai báo kiểu dữ liệu cho Form ----
export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  fullname: string;
  address: string;
  phoneNumber: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

// ---- (4) Hàm đăng ký (register) ----
export const registerApi = async (data: RegisterFormData) => {
  try {
    const response = await axiosInstance.post('/api/Account/register', data);
    return response.data; // JSON trả về từ server
  } catch (error) {
    console.error('registerApi error:', error);
    throw error;
  }
};

// ---- (5) Hàm đăng nhập (login) ----
export const loginApi = async (data: LoginFormData) => {
  try {
    const response = await axiosInstance.post('/api/Account/login', data);
    return response.data;
  } catch (error) {
    console.error('loginApi error:', error);
    throw error;
  }
};
