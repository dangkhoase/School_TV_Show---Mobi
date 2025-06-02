'use client';

import { registerApi, type RegisterFormData } from '@/api/authApi';
import { FormNumericInput, FormTextInput } from '@/components/from-inputs';
import { zodResolver } from '@hookform/resolvers/zod';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, router } from 'expo-router';
import { Home, Lock, Mail, Phone, User } from 'lucide-react-native';
import type React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { z } from 'zod';

// Define validation schema with Zod
const registerSchema = z
  .object({
    username: z.string().min(5, { message: 'Username phải ít nhất 5 ký tự' }),
    email: z.string().email({ message: 'Email không hợp lệ' }),
    password: z.string().min(8, { message: 'Mật khẩu phải ít nhất 8 ký tự' }),
    confirmPassword: z.string(),
    fullname: z.string().min(1, { message: 'Bạn chưa nhập họ tên' }),
    address: z.string().min(1, { message: 'Bạn chưa nhập địa chỉ' }),
    phoneNumber: z
      .string()
      .min(9, { message: 'Số điện thoại quá ngắn' })
      .max(12, { message: 'Số điện thoại không quá 12 chữ số' })
      .regex(/^[0-9]+$/, { message: 'Số điện thoại chỉ được chứa số' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không trùng khớp',
    path: ['confirmPassword'],
  });

type FormRegister = z.infer<typeof registerSchema>;

const RegisterScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormRegister>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      fullname: '',
      address: '',
      phoneNumber: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    try {
      const result = await registerApi(data);
      setLoading(false);

      if (result) {
        Alert.alert('Thành công', result.message);
        router.replace('/login');
      } else {
        Alert.alert('Thất bại', result.message || 'Đăng ký không thành công.');
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Lỗi', 'Không thể kết nối đến máy chủ.');
      console.error('onSubmit error:', error);
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=1000' }}
      style={styles.backgroundImage}
    >
      <LinearGradient colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.8)']} style={styles.gradient}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
          >
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Đăng Ký Tài Khoản</Text>
              <Text style={styles.subHeaderText}>Tạo tài khoản mới để tiếp tục</Text>
            </View>

            <View style={styles.formContainer}>
              <FormTextInput
                name="username"
                control={control}
                label="Tên tài khoản"
                stylelabel={{ color: '#fff' }}
                placeholder="Nhập tên tài khoản"
                error={errors.username}
                leftIcon={<User size={20} color="#6B7280" />}
                autoCapitalize="none"
              />

              <FormTextInput
                name="email"
                control={control}
                label="Email"
                stylelabel={{ color: '#fff' }}
                placeholder="Nhập email"
                error={errors.email}
                leftIcon={<Mail size={20} color="#6B7280" />}
                autoCapitalize="none"
                keyboardType="email-address"
              />

              <FormTextInput
                name="password"
                control={control}
                label="Mật khẩu"
                stylelabel={{ color: '#fff' }}
                placeholder="Nhập mật khẩu"
                error={errors.password}
                leftIcon={<Lock size={20} color="#6B7280" />}
                secureTextEntry
              />

              <FormTextInput
                name="confirmPassword"
                control={control}
                label="Nhập lại mật khẩu"
                stylelabel={{ color: '#fff' }}
                placeholder="Xác nhận mật khẩu"
                error={errors.confirmPassword}
                leftIcon={<Lock size={20} color="#6B7280" />}
                secureTextEntry
              />

              <FormTextInput
                name="fullname"
                control={control}
                label="Họ tên"
                stylelabel={{ color: '#fff' }}
                placeholder="Nhập họ tên đầy đủ"
                error={errors.fullname}
                leftIcon={<User size={20} color="#6B7280" />}
              />

              <FormTextInput
                name="address"
                control={control}
                label="Địa chỉ"
                stylelabel={{ color: '#fff' }}
                placeholder="Nhập địa chỉ"
                error={errors.address}
                leftIcon={<Home size={20} color="#6B7280" />}
              />

              <FormNumericInput
                name="phoneNumber"
                control={control}
                label="Số điện thoại"
                stylelabel={{ color: '#fff' }}
                placeholder="Nhập số điện thoại"
                error={errors.phoneNumber}
                leftIcon={<Phone size={20} color="#6B7280" />}
              />

              <Pressable
                onPress={handleSubmit(onSubmit)}
                disabled={loading}
                style={({ pressed }) => [
                  styles.signInButton,
                  pressed && styles.pressedButton,
                  loading && styles.disabledButton,
                ]}
              >
                <View style={styles.buttonContent}>
                  {loading && (
                    <ActivityIndicator color="white" size="small" style={styles.loadingIndicator} />
                  )}
                  <Text style={[styles.buttonTitle, loading && styles.buttonTitleDisabled]}>
                    Đăng Ký
                  </Text>
                </View>
              </Pressable>
            </View>
          </ScrollView>

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Đã có tài khoản?</Text>
            <Link href={'/login'}>
              <Text style={styles.signUpText}>Đăng nhập</Text>
            </Link>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </ImageBackground>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    maxWidth: 400,
    flex: 1,
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 30,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  subHeaderText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  formContainer: {
    width: '100%',
    marginBottom: 20,
  },
  signInButton: {
    backgroundColor: '#6C63FF',
    borderRadius: 25,
    height: 50,
    marginTop: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  pressedButton: {
    backgroundColor: '#5A52E0',
    transform: [{ scale: 0.98 }],
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  loadingIndicator: {
    marginRight: 10,
  },
  buttonTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  buttonTitleDisabled: {
    opacity: 0.7,
  },
  disabledButton: {
    backgroundColor: 'rgba(108, 99, 255, 0.5)',
    elevation: 0,
    shadowOpacity: 0,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  footerText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  signUpText: {
    color: '#6C63FF',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 5,
  },
});
