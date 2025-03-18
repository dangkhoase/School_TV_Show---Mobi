'use client';

import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Search, Filter, Eye, Clock } from 'lucide-react-native';

// Mock data for featured videos
const featuredVideosData = [
  {
    id: '1',
    title: 'Top 10 Lý Do Chọn ĐH Bách Khoa',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2071&auto=format&fit=crop',
    profileImageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    channelName: 'ĐH Bách Khoa Hà Nội',
    viewCount: 10234,
    timeAgo: '2 ngày',
    durationSeconds: 924, // 15:24
  },
  {
    id: '2',
    title: 'Hướng Dẫn Đăng Ký Học Phần',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop',
    profileImageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    channelName: 'ĐH Kinh Tế Quốc Dân',
    viewCount: 8567,
    timeAgo: '1 tuần',
    durationSeconds: 1110, // 18:30
  },
  {
    id: '3',
    title: 'Phỏng vấn Tân Cử Nhân',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1560523159-4a9692d222f9?q=80&w=2070&auto=format&fit=crop',
    profileImageUrl: 'https://randomuser.me/api/portraits/women/28.jpg',
    channelName: 'ĐH Ngoại Thương',
    viewCount: 6245,
    timeAgo: '3 ngày',
    durationSeconds: 845, // 14:05
  },
  {
    id: '4',
    title: 'Highlights Lễ Tốt Nghiệp 2022',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1523289333742-be1143f6b766?q=80&w=2070&auto=format&fit=crop',
    profileImageUrl: 'https://randomuser.me/api/portraits/men/45.jpg',
    channelName: 'ĐH Quốc Gia Hà Nội',
    viewCount: 12453,
    timeAgo: '6 tháng',
    durationSeconds: 625, // 10:25
  },
  {
    id: '5',
    title: 'Kỹ năng mềm cần thiết cho sinh viên năm nhất',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop',
    profileImageUrl: 'https://randomuser.me/api/portraits/women/22.jpg',
    channelName: 'ĐH Sư Phạm Hà Nội',
    viewCount: 7834,
    timeAgo: '2 tuần',
    durationSeconds: 1254, // 20:54
  },
];

export default function FeaturedVideosScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const filteredVideos = featuredVideosData.filter(
    (video) =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.channelName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate fetching data
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const renderVideoItem = ({ item }) => (
    <TouchableOpacity
      style={styles.videoCard}
      onPress={() => router.push(`/video/${item.id}`)}
    >
      <View style={styles.thumbnailContainer}>
        <Image source={{ uri: item.thumbnailUrl }} style={styles.thumbnail} />
        <View style={styles.durationTag}>
          <Text style={styles.durationText}>{formatDuration(item.durationSeconds)}</Text>
        </View>
      </View>

      <View style={styles.videoInfo}>
        <Image source={{ uri: item.profileImageUrl }} style={styles.profileImage} />

        <View style={styles.videoDetails}>
          <Text style={styles.videoTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.channelName}>{item.channelName}</Text>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Eye size={14} color="#6B7280" />
              <Text style={styles.statText}>{item.viewCount} lượt xem</Text>
            </View>
            <View style={styles.statItem}>
              <Clock size={14} color="#6B7280" />
              <Text style={styles.statText}>{item.timeAgo} trước</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Video Nổi Bật</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#6B7280" />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm video..."
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredVideos}
        renderItem={renderVideoItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#6C63FF']}
            tintColor="#6C63FF"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {searchQuery ? 'Không tìm thấy video nào phù hợp' : 'Không có video nổi bật'}
            </Text>
          </View>
        }
      />
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  filterButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 16,
    height: 48,
    backgroundColor: '#F3F4F6',
    borderRadius: 24,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#111827',
  },
  listContent: {
    padding: 16,
  },
  videoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  thumbnailContainer: {
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  durationTag: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  videoInfo: {
    flexDirection: 'row',
    padding: 12,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  videoDetails: {
    flex: 1,
  },
  videoTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  channelName: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 6,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#6B7280',
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
});
