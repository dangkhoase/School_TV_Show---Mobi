'use client';

import { changePassword } from '@/api/useApi';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, Eye, EyeOff, Lock } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ChangetPasswordScreen() {
  const insets = useSafeAreaInsets();
  const { token } = useLocalSearchParams();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const validatePassword = (password: string) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }

    if (!validatePassword(newPassword)) {
      Alert.alert(
        'Mật khẩu không đủ mạnh',
        'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số'
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp');
      return;
    }

    setLoading(true);
    try {
      await changePassword({
        currentPassword,
        newPassword,
        confirmNewPassword: confirmPassword
      });
      setResetSuccess(true);
    } catch (error: any) {
      Alert.alert('Lỗi', error.message || 'Có lỗi xảy ra khi đổi mật khẩu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ArrowLeft size={24} color="#333" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.formContainer}
        >
          <Text style={styles.title}>Đổi mật khẩu</Text>

          {!resetSuccess ? (
            <>
              <Text style={styles.subtitle}>Nhập mật khẩu hiện tại và mật khẩu mới</Text>

              <View style={styles.inputContainer}>
                <Lock size={20} color="#6B7280" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Mật khẩu hiện tại"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showCurrentPassword}
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                  style={styles.eyeButton}
                >
                  {showCurrentPassword ? (
                    <EyeOff size={20} color="#6B7280" />
                  ) : (
                    <Eye size={20} color="#6B7280" />
                  )}
                </TouchableOpacity>
              </View>

              <View style={styles.inputContainer}>
                <Lock size={20} color="#6B7280" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Mật khẩu mới"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showNewPassword}
                  value={newPassword}
                  onChangeText={setNewPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowNewPassword(!showNewPassword)}
                  style={styles.eyeButton}
                >
                  {showNewPassword ? (
                    <EyeOff size={20} color="#6B7280" />
                  ) : (
                    <Eye size={20} color="#6B7280" />
                  )}
                </TouchableOpacity>
              </View>

              <View style={styles.passwordStrength}>
                <Text style={styles.passwordStrengthText}>Mật khẩu phải có:</Text>
                <View style={styles.passwordRequirement}>
                  <View
                    style={[
                      styles.checkDot,
                      newPassword.length >= 8 ? styles.validRequirement : {},
                    ]}
                  />
                  <Text style={styles.requirementText}>Ít nhất 8 ký tự</Text>
                </View>
                <View style={styles.passwordRequirement}>
                  <View
                    style={[
                      styles.checkDot,
                      /[A-Z]/.test(newPassword) ? styles.validRequirement : {},
                    ]}
                  />
                  <Text style={styles.requirementText}>Ít nhất 1 chữ hoa</Text>
                </View>
                <View style={styles.passwordRequirement}>
                  <View
                    style={[
                      styles.checkDot,
                      /[a-z]/.test(newPassword) ? styles.validRequirement : {},
                    ]}
                  />
                  <Text style={styles.requirementText}>Ít nhất 1 chữ thường</Text>
                </View>
                <View style={styles.passwordRequirement}>
                  <View
                    style={[styles.checkDot, /\d/.test(newPassword) ? styles.validRequirement : {}]}
                  />
                  <Text style={styles.requirementText}>Ít nhất 1 số</Text>
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Lock size={20} color="#6B7280" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Xác nhận mật khẩu mới"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeButton}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} color="#6B7280" />
                  ) : (
                    <Eye size={20} color="#6B7280" />
                  )}
                </TouchableOpacity>
              </View>

              {confirmPassword && newPassword !== confirmPassword && (
                <Text style={styles.errorText}>Mật khẩu xác nhận không khớp</Text>
              )}

              <TouchableOpacity
                style={styles.resetButton}
                onPress={handleChangePassword}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <Text style={styles.resetButtonText}>Đổi mật khẩu</Text>
                )}
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View style={styles.successContainer}>
                <View style={styles.successCircle}>
                  <Text style={styles.successIcon}>✓</Text>
                </View>
                <Text style={styles.successTitle}>Đặt lại mật khẩu thành công!</Text>
                <Text style={styles.successMessage}>
                  Mật khẩu của bạn đã được cập nhật. 
                </Text>

                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={() => router.replace('/')}
                >
                  <Text style={styles.loginButtonText}>Trang chủ</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 16,
  },
  scrollContent: {
    flexGrow: 1,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 56,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#F9FAFB',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#111827',
  },
  eyeButton: {
    padding: 8,
  },
  passwordStrength: {
    width: '100%',
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
  },
  passwordStrengthText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: 8,
  },
  passwordRequirement: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  checkDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
    marginRight: 8,
  },
  validRequirement: {
    backgroundColor: '#10B981',
  },
  requirementText: {
    fontSize: 14,
    color: '#6B7280',
  },
  errorText: {
    width: '100%',
    fontSize: 14,
    color: '#EF4444',
    marginBottom: 16,
  },
  resetButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#6C63FF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  successCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  successIcon: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  successTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  successMessage: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  loginButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#6C63FF',
    borderRadius: 12,
    padding:10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
