'use client';

import { AccountInfo } from '@/api/useApi';
import { useSession } from '@/auth/ctx';
import { UserProfile } from '@/types/authTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  ChevronRight,
  Edit,
  HelpCircle,
  Lock,
  LogOut,
  Settings,
  Shield,
  User
} from 'lucide-react-native';
import { useCallback, useEffect, useState } from 'react';
import {
  Animated,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { signOut } = useSession();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [user, setUser] = useState<UserProfile | null>(null);
  const fetchData = useCallback(async () => {
    try {
      const response = await AccountInfo();
      setUser(response);
      console.log('User data:', response);
    } catch (error) {
      console.log('Error fetching account info:', error);
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
 

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      signOut();
      router.replace('/login');
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  const showLogoutModal = () => {
    setLogoutModalVisible(true);
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const hideLogoutModal = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setLogoutModalVisible(false);
    });
  };

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5],
  });

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hồ Sơ</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            <Image source={{ uri: user?.avatar || "https://randomuser.me/api/portraits/men/32.jpg" }} style={styles.avatar} />
            <View style={styles.profileInfo}>
              <Text style={styles.name}>{user?.fullname}</Text>
              <Text style={styles.username}>{user?.username}</Text>
              <Text style={styles.bio}>{user?.email}</Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push('/update-account')}
              style={styles.editButton}
            >
              <Edit size={18} color="#6C63FF" />
            </TouchableOpacity>
          </View>

          {/* Stats */}
          {/* <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user?.posts}</Text>
              <Text style={styles.statLabel}>Bài viết</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user?.followers}</Text>
              <Text style={styles.statLabel}>Người theo dõi</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user?.following}</Text>
              <Text style={styles.statLabel}>Đang theo dõi</Text>
            </View>
          </View> */}
        </View>

        {/* Activity Section */}
        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hoạt động gần đây</Text>
          <View style={styles.activityContainer}>
            <TouchableOpacity onPress={() => router.replace('/')} style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: '#FFE8EC' }]}>
                <Heart size={20} color="#FF4D67" />
              </View>
              <Text style={styles.activityText}>Bài viết đã thích</Text>
              <ChevronRight size={20} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: '#E8F1FF' }]}>
                <MessageSquare size={20} color="#4A90E2" />
              </View>
              <Text style={styles.activityText}>Bình luận của tôi</Text>
              <ChevronRight size={20} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: '#E8FFEA' }]}>
                <Bookmark size={20} color="#50C878" />
              </View>
              <Text style={styles.activityText}>Đã lưu</Text>
              <ChevronRight size={20} color="#999" />
            </TouchableOpacity>
          </View>
        </View> */}

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cài đặt tài khoản</Text>
          <View style={styles.settingsContainer}>
            <TouchableOpacity style={styles.settingItem } onPress={() => router.push('/update-account')}> 
              <View style={[styles.settingIcon, { backgroundColor: '#F0F0F0' }]}>
                <User size={20} color="#333" />
              </View>
              <Text style={styles.settingText}>Thông tin cá nhân</Text>
              <ChevronRight size={20} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push('/changepassword')}
              style={styles.settingItem}
            >
              <View style={[styles.settingIcon, { backgroundColor: '#F0F0F0' }]}>
                <Lock size={20} color="#333" />
              </View>
              <Text style={styles.settingText}>Bảo mật</Text>
              <ChevronRight size={20} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={[styles.settingIcon, { backgroundColor: '#F0F0F0' }]}>
                <Shield size={20} color="#333" />
              </View>
              <Text style={styles.settingText}>Quyền riêng tư</Text>
              <ChevronRight size={20} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={[styles.settingIcon, { backgroundColor: '#F0F0F0' }]}>
                <HelpCircle size={20} color="#333" />
              </View>
              <Text style={styles.settingText}>Trợ giúp</Text>
              <ChevronRight size={20} color="#999" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={showLogoutModal}>
          <LogOut size={20} color="#FF4D67" />
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Logout Modal */}
      <Modal
        visible={logoutModalVisible}
        transparent={true}
        animationType="none"
        onRequestClose={hideLogoutModal}
      >
        <View style={styles.modalContainer}>
          <Animated.View
            style={[styles.modalOverlay, { opacity: opacity }]}
            onTouchEnd={hideLogoutModal}
          />
          <Animated.View style={[styles.modalContent, { transform: [{ translateY: translateY }] }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Đăng xuất</Text>
              <Text style={styles.modalSubtitle}>Bạn có chắc chắn muốn đăng xuất?</Text>
            </View>

            <TouchableOpacity
              style={[styles.modalButton, styles.logoutConfirmButton]}
              onPress={handleLogout}
            >
              <Text style={styles.logoutConfirmText}>Đăng xuất</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={hideLogoutModal}
            >
              <Text style={styles.cancelText}>Hủy</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  settingsButton: {
    padding: 5,
  },
  profileSection: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 8,
    borderBottomColor: '#F5F5F5',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  username: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  bio: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  statDivider: {
    width: 1,
    height: '70%',
    backgroundColor: '#E0E0E0',
  },
  section: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 8,
    borderBottomColor: '#F5F5F5',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  activityContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  activityText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  settingsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 30,
    padding: 15,
    backgroundColor: '#FFF0F0',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFE0E0',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF4D67',
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  modalButton: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 10,
  },
  logoutConfirmButton: {
    backgroundColor: '#FF4D67',
  },
  logoutConfirmText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#F0F0F0',
  },
  cancelText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
});
