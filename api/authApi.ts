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
    const response = await axiosInstance.post('/api/accounts/register', data);
    return response.data; // JSON trả về từ server
  } catch (error) {
    console.log('registerApi error:', error);
    throw error;
  }
};

// ---- (5) Hàm đăng nhập (login) ----
export const loginApi = async (data: LoginFormData) => {
  try {
    const response = await axiosInstance.post('/api/accounts/login', data);
    return response.data;
  } catch (error) {
    // console.log('loginApi error:', error);
    throw error;
  }
};
