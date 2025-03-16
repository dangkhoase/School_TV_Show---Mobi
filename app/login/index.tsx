// src/screens/LoginScreen.tsx

import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm, Controller } from 'react-hook-form';
import { LoginFormData } from '../../types/authTypes';
import { loginApi } from '../../api/authApi';
import { Link } from 'expo-router';
import { useLinkTo } from '@react-navigation/native';

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const linkTo = useLinkTo();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await loginApi(data);
      console.log(result);

      if (result) {
        // Lưu token

        if (result.data && result.data.token) {
          await AsyncStorage.setItem('token', result.token);
        }
        Alert.alert('Thành công', result.message);
        linkTo('/'); // Hoặc màn hình chính bạn muốn
      } else {
        Alert.alert('Sai thông tin', 'Tài khoản hoặc mật khẩu không chính xác!');
      }
    } catch (error) {
      Alert.alert('Sai thông tin', 'Tài khoản hoặc mật khẩu không chính xác!');
      // console.error('onSubmit error:', error);
    }
  };

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Đăng Nhập</Text>

        <View style={styles.card}>
          {/* EMAIL */}
          <Text style={styles.label}>Email</Text>
          <Controller
            control={control}
            name="email"
            rules={{
              required: 'Bạn chưa nhập email',
              pattern: { value: /^\S+@\S+$/i, message: 'Email không hợp lệ' },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Nhập email"
                keyboardType="email-address"
              />
            )}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

          {/* PASSWORD */}
          <Text style={styles.label}>Mật khẩu</Text>
          <Controller
            control={control}
            name="password"
            rules={{
              required: 'Bạn chưa nhập mật khẩu',
              minLength: { value: 6, message: 'Mật khẩu phải ít nhất 6 ký tự' },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.password && styles.inputError]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Nhập mật khẩu"
                secureTextEntry
              />
            )}
          />
          {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

          {/* Button Đăng Nhập */}
          <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.buttonText}>Đăng Nhập</Text>
          </TouchableOpacity>

          {/* Link chuyển qua màn hình Đăng ký */}
          <Text style={styles.switchText}>
            Chưa có tài khoản?
            <Link href={'/register'} style={styles.switchTextHighlight}>
              Đăng Ký
            </Link>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    elevation: 3, // Android
    shadowColor: '#000', // iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    marginTop: 8,
    fontWeight: '600',
    color: '#444',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 4,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    marginTop: 2,
    color: 'red',
    fontSize: 12,
  },
  button: {
    marginTop: 16,
    backgroundColor: '#0066cc',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  switchText: {
    textAlign: 'center',
    marginTop: 12,
    color: '#777',
  },
  switchTextHighlight: {
    color: '#0066cc',
    fontWeight: '600',
  },
});
