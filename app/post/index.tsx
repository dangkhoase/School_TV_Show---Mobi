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
import { ArrowLeft, Search, Filter, Heart, MessageCircle, Share2 } from 'lucide-react-native';

// Mock data for community posts
const communityPostsData = [
  {
    id: '1',
    authorName: 'ĐH Ngoại Thương',
    authorImageUrl: 'https://randomuser.me/api/portraits/men/75.jpg',
    content:
      'Chúc mừng đội tuyển sinh viên FTU đã đạt giải Nhất cuộc thi "Marketing Challenge 2023" ! Tự hào về các bạn 🎉',
    imageUrl:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop',
    timeAgo: '2 giờ',
    likes: 126,
    comments: 35,
  },
  {
    id: '2',
    authorName: 'ĐH Bách Khoa Hà Nội',
    authorImageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    content:
      'Thông báo: Lịch thi học kỳ 1 năm học 2023-2024 đã được cập nhật trên cổng thông tin sinh viên. Các bạn sinh viên vui lòng kiểm tra và chuẩn bị thật tốt cho kỳ thi sắp tới nhé!',
    imageUrl: null,
    timeAgo: '5 giờ',
    likes: 89,
    comments: 42,
  },
  {
    id: '3',
    authorName: 'ĐH Kinh Tế Quốc Dân',
    authorImageUrl: 'https://randomuser.me/api/portraits/women/28.jpg',
    content:
      'Thông báo tuyển sinh chương trình đào tạo thạc sĩ quản trị kinh doanh khóa 2024. Hạn nộp hồ sơ: 15/01/2024. Chi tiết xem tại website của trường.',
    imageUrl:
      'https://images.unsplash.com/photo-1568992687947-868a62a9f521?q=80&w=2152&auto=format&fit=crop',
    timeAgo: '1 ngày',
    likes: 64,
    comments: 18,
  },
  {
    id: '4',
    authorName: 'ĐH Sư Phạm Hà Nội',
    authorImageUrl: 'https://randomuser.me/api/portraits/women/45.jpg',
    content:
      'Chúc mừng PGS.TS Nguyễn Văn A đã được trao tặng danh hiệu Nhà giáo ưu tú năm 2023. Đây là niềm tự hào của toàn thể cán bộ, giảng viên và sinh viên nhà trường! 👏👏👏',
    imageUrl: null,
    timeAgo: '3 ngày',
    likes: 215,
    comments: 28,
  },
  {
    id: '5',
    authorName: 'ĐH FPT',
    authorImageUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
    content:
      'Hôm nay, Đại học FPT đã ký kết thỏa thuận hợp tác với 5 doanh nghiệp công nghệ hàng đầu, mở ra cơ hội thực tập và việc làm cho sinh viên IT sau khi tốt nghiệp.',
    imageUrl:
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop',
    timeAgo: '4 ngày',
    likes: 178,
    comments: 23,
  },
];

export default function CommunityPostsScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [likedPosts, setLikedPosts] = useState({});

  const filteredPosts = communityPostsData.filter(
    (post) =>
      post.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate fetching data
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const handleLikePost = (postId) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const renderPostItem = ({ item }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Image source={{ uri: item.authorImageUrl }} style={styles.authorImage} />
        <View style={styles.authorInfo}>
          <Text style={styles.authorName}>{item.authorName}</Text>
          <Text style={styles.postTime}>{item.timeAgo} trước</Text>
        </View>
      </View>

      <Text style={styles.postContent}>{item.content}</Text>

      {item.imageUrl && <Image source={{ uri: item.imageUrl }} style={styles.postImage} />}

      <View style={styles.postStats}>
        <Text style={styles.statText}>
          {likedPosts[item.id] ? item.likes + 1 : item.likes} lượt thích • {item.comments} bình luận
        </Text>
      </View>

      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton} onPress={() => handleLikePost(item.id)}>
          <Heart
            size={20}
            color={likedPosts[item.id] ? '#EF4444' : '#6B7280'}
            fill={likedPosts[item.id] ? '#EF4444' : 'none'}
          />
          <Text style={[styles.actionText, likedPosts[item.id] && { color: '#EF4444' }]}>
            Thích
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push(`/post/${item.id}`)}
        >
          <MessageCircle size={20} color="#6B7280" />
          <Text style={styles.actionText}>Bình luận</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Share2 size={20} color="#6B7280" />
          <Text style={styles.actionText}>Chia sẻ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bài Viết Cộng Đồng</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#6B7280" />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm bài viết..."
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredPosts}
        renderItem={renderPostItem}
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
              {searchQuery ? 'Không tìm thấy bài viết nào phù hợp' : 'Không có bài viết nào'}
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
  postCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  authorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#111827',
  },
  postTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  postContent: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
    resizeMode: 'cover',
  },
  postStats: {
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  statText: {
    fontSize: 12,
    color: '#6B7280',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    marginLeft: 6,
    fontSize: 14,
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
