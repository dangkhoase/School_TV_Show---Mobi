// src/types/authTypes.ts

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
