// src/screens/RegisterScreen.tsx

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
import { useForm, Controller } from 'react-hook-form';
import { registerApi, RegisterFormData } from '@/api/authApi';
import { Link } from 'expo-router';
import { useLinkTo } from '@react-navigation/native';

const RegisterScreen: React.FC = () => {
  const linkTo = useLinkTo();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const passwordValue = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const result = await registerApi(data);
      if (result.success) {
        Alert.alert('Thành công', result.message);
        linkTo('/');
      } else {
        Alert.alert('Thất bại', result.message || 'Đăng ký không thành công.');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể kết nối đến máy chủ.');
      console.error('onSubmit error:', error);
    }
  };

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Đăng Ký</Text>

        <View style={styles.card}>
          {/* USERNAME */}
          <Text style={styles.label}>Tên tài khoản</Text>
          <Controller
            control={control}
            name="username"
            rules={{
              required: 'Bạn chưa nhập username',
              minLength: { value: 5, message: 'Username phải ít nhất 5 ký tự' },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.username && styles.inputError]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Nhập tên tài khoản"
              />
            )}
          />
          {errors.username && <Text style={styles.errorText}>{errors.username.message}</Text>}

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
              minLength: { value: 8, message: 'Mật khẩu phải ít nhất 6 ký tự' },
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

          {/* CONFIRM PASSWORD */}
          <Text style={styles.label}>Nhập lại mật khẩu</Text>
          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              required: 'Bạn chưa nhập lại mật khẩu',
              validate: (value) => value === passwordValue || 'Mật khẩu xác nhận không trùng khớp',
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.confirmPassword && styles.inputError]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Xác nhận mật khẩu"
                secureTextEntry
              />
            )}
          />
          {errors.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
          )}

          {/* FULLNAME */}
          <Text style={styles.label}>Họ tên</Text>
          <Controller
            control={control}
            name="fullname"
            rules={{ required: 'Bạn chưa nhập họ tên' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.fullname && styles.inputError]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Nhập họ tên đầy đủ"
              />
            )}
          />
          {errors.fullname && <Text style={styles.errorText}>{errors.fullname.message}</Text>}

          {/* ADDRESS */}
          <Text style={styles.label}>Địa chỉ</Text>
          <Controller
            control={control}
            name="address"
            rules={{ required: 'Bạn chưa nhập địa chỉ' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.address && styles.inputError]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Nhập địa chỉ"
              />
            )}
          />
          {errors.address && <Text style={styles.errorText}>{errors.address.message}</Text>}

          {/* PHONE NUMBER */}
          <Text style={styles.label}>Số điện thoại</Text>
          <Controller
            control={control}
            name="phoneNumber"
            rules={{
              required: 'Bạn chưa nhập số điện thoại',
              pattern: { value: /^[0-9]+$/i, message: 'Số điện thoại chỉ được chứa số' },
              minLength: { value: 9, message: 'Số điện thoại quá ngắn' },
              maxLength: { value: 12, message: 'Số điện thoại không quá 12 chữ số' },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.phoneNumber && styles.inputError]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Nhập số điện thoại"
                keyboardType="phone-pad"
              />
            )}
          />
          {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber.message}</Text>}

          {/* Button Đăng ký */}
          <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.buttonText}>Đăng Ký</Text>
          </TouchableOpacity>

          {/* Link chuyển sang màn hình Đăng nhập */}
          <Text style={styles.switchText}>
            Đã có tài khoản?{' '}
            <Link href={'/login'} style={styles.switchTextHighlight}>
              Đăng nhập
            </Link>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;

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
    elevation: 3, // bóng cho Android
    shadowColor: '#000', // bóng cho iOS
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
