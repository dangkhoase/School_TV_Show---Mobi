'use client';

import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Mail } from 'lucide-react-native';

export default function ForgotPasswordScreen() {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSendResetLink = async () => {
    if (!email.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập địa chỉ email của bạn');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Lỗi', 'Vui lòng nhập địa chỉ email hợp lệ');
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setEmailSent(true);
    }, 1500);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ArrowLeft size={24} color="#333" />
      </TouchableOpacity>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.formContainer}
      >
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/6195/6195699.png' }}
          style={styles.forgotImage}
        />

        <Text style={styles.title}>Quên mật khẩu?</Text>

        {!emailSent ? (
          <>
            <Text style={styles.subtitle}>
              Vui lòng nhập địa chỉ email của bạn. Chúng tôi sẽ gửi một liên kết để đặt lại mật
              khẩu.
            </Text>

            <View style={styles.inputContainer}>
              <Mail size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Nhập email của bạn"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSendResetLink}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={styles.sendButtonText}>Gửi liên kết đặt lại</Text>
              )}
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.successMessage}>
              Chúng tôi đã gửi một email đến <Text style={styles.emailHighlight}>{email}</Text> với
              liên kết để đặt lại mật khẩu của bạn.
            </Text>

            <Text style={styles.instructionText}>
              Nếu bạn không nhận được email trong vòng vài phút, vui lòng kiểm tra thư mục spam hoặc
              thử lại.
            </Text>

            <TouchableOpacity style={styles.resendButton} onPress={handleSendResetLink}>
              <Text style={styles.resendButtonText}>Gửi lại email</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.backToLoginButton}
              onPress={() => router.replace('/login')}
            >
              <Text style={styles.backToLoginText}>Quay lại đăng nhập</Text>
            </TouchableOpacity>
          </>
        )}
      </KeyboardAvoidingView>
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
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotImage: {
    width: 150,
    height: 150,
    marginBottom: 24,
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
    lineHeight: 24,
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
    marginBottom: 24,
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
  sendButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#6C63FF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  successMessage: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  emailHighlight: {
    fontWeight: 'bold',
    color: '#111827',
  },
  instructionText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 24,
    textAlign: 'center',
  },
  resendButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#6C63FF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  resendButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  backToLoginButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backToLoginText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B5563',
  },
});
