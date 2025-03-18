'use client';

import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Heart,
  Share2,
  BookmarkPlus,
  Eye,
  Send,
  Building,
  Clock,
  MapPin,
} from 'lucide-react-native';

// Mock data for live events
const liveEventsData = [
  {
    id: '1',
    title: 'Lễ Tốt Nghiệp 2023 - ĐH Bách Khoa Hà Nội',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2071&auto=format&fit=crop',
    organizer: 'ĐH Bách Khoa Hà Nội',
    viewCount: 1234,
    startedTime: '2 giờ trước',
    likes: 2500,
    description:
      'Buổi lễ tốt nghiệp trang trọng dành cho các tân kỹ sư, cử nhân Đại học Bách Khoa Hà Nội. Chương trình bao gồm các phần:\n\n• Phát biểu của Ban Giám hiệu\n• Trao bằng tốt nghiệp\n• Vinh danh sinh viên xuất sắc\n• Các tiết mục văn nghệ đặc sắc',
    location: 'Hội trường A1',
    date: '25/12/2023',
    time: '14:00',
    participants: 2000,
    isLive: true,
  },
  {
    id: '2',
    title: 'Hội thảo: Công nghệ AI trong Giáo dục',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop',
    organizer: 'ĐH FPT',
    viewCount: 856,
    startedTime: '30 phút trước',
    likes: 980,
    description:
      'Hội thảo chia sẻ về các ứng dụng của AI trong lĩnh vực giáo dục, từ hệ thống học tập cá nhân hóa đến các công cụ đánh giá tự động. Các chuyên gia hàng đầu sẽ thảo luận về tương lai của giáo dục trong kỷ nguyên AI.',
    location: 'Hội trường B2',
    date: '20/12/2023',
    time: '09:00',
    participants: 500,
    isLive: true,
  },
];

// Mock comments data
const commentsData = [
  {
    id: '1',
    user: 'Minh Anh',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    text: 'Chúc mừng các tân cử nhân! 🎓',
    time: '18:06:37',
    isModerator: true,
  },
  {
    id: '2',
    user: 'Thu Hà',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    text: 'Buổi lễ thật trang trọng và ý nghĩa 👏',
    time: '18:06:38',
    isModerator: false,
  },
  {
    id: '3',
    user: 'Minh Anh',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    text: 'Chúc các bạn thành công trên con đường sắp tới ⭐',
    time: '18:06:39',
    isModerator: true,
  },
];

export default function EventDetailScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const [event, setEvent] = useState(null);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('live');
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(commentsData);

  useEffect(() => {
    // Find the event by id
    const foundEvent = liveEventsData.find((e) => e.id === id);
    if (foundEvent) {
      setEvent(foundEvent);
    }
  }, [id]);

  const handleSendComment = () => {
    if (!commentText.trim()) return;

    const newComment = {
      id: String(comments.length + 1),
      user: 'Bạn',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      text: commentText,
      time: new Date().toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }),
      isModerator: false,
    };

    setComments([...comments, newComment]);
    setCommentText('');
  };

  if (!event) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text style={styles.loadingText}>Đang tải...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="light" />

      {/* Video Player */}
      <View style={styles.videoContainer}>
        <Image source={{ uri: event?.thumbnailUrl }} style={styles.videoThumbnail} />
        <View style={styles.videoOverlay} />

        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.playButton}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1384/1384060.png' }}
            style={styles.youtubeIcon}
          />
        </View>

        {event.isLive && (
          <View style={styles.liveIndicator}>
            <Text style={styles.liveText}>• LIVE</Text>
          </View>
        )}
      </View>

      {/* Event Info */}
      <View style={styles.eventInfoContainer}>
        <Text style={styles.eventTitle}>{event.title}</Text>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Eye size={16} color="#6B7280" />
            <Text style={styles.statText}>{event.viewCount} người xem</Text>
          </View>
          <Text style={styles.timeText}>Bắt đầu {event.startedTime}</Text>
        </View>

        <View style={styles.organizerRow}>
          <Building size={16} color="#6B7280" />
          <Text style={styles.organizerText}>{event.organizer}</Text>
        </View>

        <View style={styles.likesRow}>
          <Heart size={16} color="#6B7280" />
          <Text style={styles.likesText}>{event.likes} lượt thích</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, liked && styles.actionButtonActive]}
            onPress={() => setLiked(!liked)}
          >
            <Heart size={20} color={liked ? '#EF4444' : '#6B7280'} />
            <Text style={[styles.actionText, liked && styles.actionTextActive]}>Thích</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Share2 size={20} color="#6B7280" />
            <Text style={styles.actionText}>Chia sẻ</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, saved && styles.actionButtonActive]}
            onPress={() => setSaved(!saved)}
          >
            <BookmarkPlus size={20} color={saved ? '#6C63FF' : '#6B7280'} />
            <Text style={[styles.actionText, saved && styles.actionTextActive]}>Theo dõi</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'live' && styles.activeTab]}
          onPress={() => setActiveTab('live')}
        >
          <Text style={[styles.tabText, activeTab === 'live' && styles.activeTabText]}>
            Đang Live
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'videos' && styles.activeTab]}
          onPress={() => setActiveTab('videos')}
        >
          <Text style={[styles.tabText, activeTab === 'videos' && styles.activeTabText]}>
            Video Gợi Ý
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'posts' && styles.activeTab]}
          onPress={() => setActiveTab('posts')}
        >
          <Text style={[styles.tabText, activeTab === 'posts' && styles.activeTabText]}>
            Bài Viết
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.tabContent}
        keyboardVerticalOffset={100}
      >
        {activeTab === 'live' && (
          <>
            <ScrollView style={styles.descriptionContainer}>
              <Text style={styles.descriptionText}>{event.description}</Text>

              <View style={styles.eventDetailsContainer}>
                <View style={styles.detailRow}>
                  <Clock size={16} color="#6B7280" />
                  <Text style={styles.detailText}>
                    {event.date} - {event.time}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <MapPin size={16} color="#6B7280" />
                  <Text style={styles.detailText}>{event.location}</Text>
                </View>
              </View>
            </ScrollView>

            <View style={styles.chatContainer}>
              <Text style={styles.chatTitle}>Trò chuyện trực tiếp</Text>

              <FlatList
                data={comments}
                renderItem={({ item }) => (
                  <View style={styles.commentItem}>
                    <Image source={{ uri: item.avatar }} style={styles.commentAvatar} />
                    <View style={styles.commentContent}>
                      <View style={styles.commentHeader}>
                        <Text style={styles.commentUser}>{item.user}</Text>
                        {item.isModerator && (
                          <View style={styles.moderatorBadge}>
                            <Text style={styles.moderatorText}>Mod</Text>
                          </View>
                        )}
                      </View>
                      <Text style={styles.commentText}>{item.text}</Text>
                    </View>
                    <Text style={styles.commentTime}>{item.time}</Text>
                  </View>
                )}
                keyExtractor={(item) => item.id}
                style={styles.commentsList}
              />

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.commentInput}
                  placeholder="Nhập tin nhắn..."
                  placeholderTextColor="#9CA3AF"
                  value={commentText}
                  onChangeText={setCommentText}
                  multiline
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSendComment}>
                  <Send size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}

        {activeTab === 'videos' && (
          <View style={styles.emptyTabContent}>
            <Text style={styles.emptyText}>Không có video gợi ý</Text>
          </View>
        )}

        {activeTab === 'posts' && (
          <View style={styles.emptyTabContent}>
            <Text style={styles.emptyText}>Không có bài viết</Text>
          </View>
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
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 20,
  },
  videoContainer: {
    width: '100%',
    height: 240,
    position: 'relative',
  },
  videoThumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  videoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -30 }, { translateY: -30 }],
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  youtubeIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  liveIndicator: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#EF4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  liveText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  eventInfoContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#6B7280',
  },
  timeText: {
    fontSize: 14,
    color: '#6B7280',
  },
  organizerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  organizerText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#6B7280',
  },
  likesRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#6B7280',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  actionButtonActive: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  actionText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#6B7280',
  },
  actionTextActive: {
    color: '#6C63FF',
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#6C63FF',
  },
  tabText: {
    fontSize: 14,
    color: '#6B7280',
  },
  activeTabText: {
    color: '#6C63FF',
    fontWeight: '600',
  },
  tabContent: {
    flex: 1,
  },
  descriptionContainer: {
    padding: 16,
    maxHeight: 150,
  },
  descriptionText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  eventDetailsContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#4B5563',
  },
  chatContainer: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    padding: 16,
  },
  chatTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  commentsList: {
    flex: 1,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  commentUser: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginRight: 6,
  },
  moderatorBadge: {
    backgroundColor: '#6C63FF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  moderatorText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  commentText: {
    fontSize: 14,
    color: '#4B5563',
  },
  commentTime: {
    fontSize: 12,
    color: '#9CA3AF',
    marginLeft: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 12,
  },
  commentInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#111827',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6C63FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  emptyTabContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
});
