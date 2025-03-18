// src/screens/LoginScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginFormData } from '../../types/authTypes';
import { loginApi } from '../../api/authApi';
import { Link, router } from 'expo-router';
import { useSession } from '@/auth/ctx';
import { LinearGradient } from 'expo-linear-gradient';
import { Lock, Mail } from 'lucide-react-native';
import { FormTextInput } from '@/components/from-inputs';
import { Button } from '@rneui/themed';
import { Formlogin, loginSchema } from '@/schemaForm/login';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useStorageState } from '@/auth/useStorageState';

const LoginScreen: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Formlogin>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { signIn } = useSession();
  const [[isLoading, token], setSession] = useStorageState('token');

  console.log('isLoading 123', isLoading);
  console.log('token 123 login', token);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const result = await loginApi(data);
      console.log(result.token);

      if (result) {
        // Lưu token
        if (result && result.token) {
          await setSession(result.token);
          signIn();
        }
        setTimeout(() => {
          router.replace('/');
        }, 500);
      } else {
        setLoading(false);
        Alert.alert('Sai thông tin', 'Tài khoản hoặc mật khẩu không chính xác!');
      }
    } catch (error) {
      setLoading(false);

      Alert.alert('Sai thông tin', 'Tài khoản hoặc mật khẩu không chính xác!');
      // console.error('onSubmit error:', error);
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
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Chào mừng đến với schooltvshow</Text>
            <Text style={styles.subHeaderText}>Đăng nhập để tiếp tục</Text>
          </View>
          <View style={styles.formContainer}>
            <FormTextInput
              name="email"
              control={control}
              label="Email"
              stylelabel={{ color: '#fff' }}
              placeholder="Enter your Email"
              error={errors.email}
              leftIcon={<Mail size={20} color="#6B7280" />}
              autoCapitalize="words"
            />

            <FormTextInput
              name="password"
              control={control}
              stylelabel={{ color: '#fff' }}
              label="Mật khẩu"
              placeholder="Vui lòng nhập mật khẩu"
              error={errors.password}
              leftIcon={<Lock size={20} color="#6B7280" />}
              autoCapitalize="words"
            />
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
            <Button
              title="Sign In"
              onPress={handleSubmit(onSubmit)}
              disabled={loading}
              buttonStyle={styles.signInButton}
              titleStyle={styles.buttonTitle}
              disabledStyle={styles.disabledButton}
              icon={
                loading ? (
                  <ActivityIndicator color="white" size="small" style={{ marginRight: 10 }} />
                ) : undefined
              }
            />
          </View>
        </KeyboardAvoidingView>
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}> Chưa có tài khoản?</Text>
          <Link href={'/register'}>
            <Text style={styles.signUpText}>Sign Up</Text>
          </Link>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default LoginScreen;
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  headerText: {
    fontSize: 34,
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
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 10,
    borderBottomColor: 'rgba(255,255,255,0.2)',
  },
  inputText: {
    color: 'white',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  signInButton: {
    backgroundColor: '#6C63FF',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
  },
  buttonTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: 'rgba(108, 99, 255, 0.5)',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  dividerText: {
    color: 'white',
    paddingHorizontal: 10,
    fontSize: 14,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  signUpText: {
    color: '#6C63FF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
