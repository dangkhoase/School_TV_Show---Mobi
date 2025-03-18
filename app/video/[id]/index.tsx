'use client';

import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Share2,
  BookmarkPlus,
  Eye,
  Clock,
  ThumbsUp,
  ThumbsDown,
} from 'lucide-react-native';

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
    likes: 1250,
    dislikes: 45,
    description:
      'Video giới thiệu về 10 lý do hàng đầu để chọn Đại học Bách Khoa Hà Nội làm nơi học tập và phát triển. Từ chất lượng đào tạo đến cơ hội việc làm và môi trường học tập năng động.',
  },
];

// Mock data for related videos
const relatedVideosData = [
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
];

export default function VideoDetailScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const [video, setVideo] = useState(null);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [saved, setSaved] = useState(false);

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  useEffect(() => {
    // Find the video by id
    const foundVideo = featuredVideosData.find((v) => v.id === id);
    if (foundVideo) {
      setVideo(foundVideo);
    }
  }, [id]);

  const handleLike = () => {
    if (disliked) setDisliked(false);
    setLiked(!liked);
  };

  const handleDislike = () => {
    if (liked) setLiked(false);
    setDisliked(!disliked);
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  const renderRelatedVideoItem = ({ item }) => (
    <TouchableOpacity
      style={styles.relatedVideoItem}
      onPress={() => router.push(`/video-detail/${item.id}`)}
    >
      <View style={styles.relatedThumbnailContainer}>
        <Image source={{ uri: item.thumbnailUrl }} style={styles.relatedThumbnail} />
        <View style={styles.relatedDurationTag}>
          <Text style={styles.relatedDurationText}>{formatDuration(item.durationSeconds)}</Text>
        </View>
      </View>

      <View style={styles.relatedVideoInfo}>
        <Text style={styles.relatedVideoTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.relatedChannelName}>{item.channelName}</Text>

        <View style={styles.relatedStatsRow}>
          <Text style={styles.relatedStatText}>{item.viewCount} lượt xem</Text>
          <Text style={styles.relatedStatText}>•</Text>
          <Text style={styles.relatedStatText}>{item.timeAgo} trước</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (!video) {
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
        <Image source={{ uri: video.thumbnailUrl }} style={styles.videoThumbnail} />
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
      </View>

      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* Video Info */}
        <View style={styles.videoInfoContainer}>
          <Text style={styles.videoTitle}>{video.title}</Text>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Eye size={16} color="#6B7280" />
              <Text style={styles.statText}>{video.viewCount} lượt xem</Text>
            </View>
            <View style={styles.statItem}>
              <Clock size={16} color="#6B7280" />
              <Text style={styles.statText}>{video.timeAgo} trước</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
              <ThumbsUp
                size={20}
                color={liked ? '#6C63FF' : '#6B7280'}
                fill={liked ? '#6C63FF' : 'none'}
              />
              <Text style={[styles.actionText, liked && styles.activeActionText]}>
                {liked ? video.likes + 1 : video.likes}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={handleDislike}>
              <ThumbsDown
                size={20}
                color={disliked ? '#EF4444' : '#6B7280'}
                fill={disliked ? '#EF4444' : 'none'}
              />
              <Text style={[styles.actionText, disliked && styles.dislikedText]}>
                {disliked ? video.dislikes + 1 : video.dislikes}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Share2 size={20} color="#6B7280" />
              <Text style={styles.actionText}>Chia sẻ</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={handleSave}>
              <BookmarkPlus
                size={20}
                color={saved ? '#6C63FF' : '#6B7280'}
                fill={saved ? '#6C63FF' : 'none'}
              />
              <Text style={[styles.actionText, saved && styles.activeActionText]}>Lưu</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Channel Info */}
        <View style={styles.channelContainer}>
          <Image source={{ uri: video.profileImageUrl }} style={styles.channelImage} />
          <View style={styles.channelInfo}>
            <Text style={styles.channelName}>{video.channelName}</Text>
            <TouchableOpacity style={styles.subscribeButton}>
              <Text style={styles.subscribeText}>Theo dõi</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>{video.description}</Text>
        </View>

        {/* Related Videos */}
        <View style={styles.relatedVideosContainer}>
          <Text style={styles.relatedVideosTitle}>Video liên quan</Text>

          {relatedVideosData.map((item) => renderRelatedVideoItem({ item }))}
        </View>
      </ScrollView>
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
  contentContainer: {
    flex: 1,
  },
  videoInfoContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#6B7280',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  actionButton: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  actionText: {
    marginTop: 4,
    fontSize: 12,
    color: '#6B7280',
  },
  activeActionText: {
    color: '#6C63FF',
  },
  dislikedText: {
    color: '#EF4444',
  },
  channelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  channelImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  channelInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  channelName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  subscribeButton: {
    backgroundColor: '#6C63FF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  subscribeText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  descriptionContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  descriptionText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  relatedVideosContainer: {
    padding: 16,
  },
  relatedVideosTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  relatedVideoItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  relatedThumbnailContainer: {
    position: 'relative',
    width: 120,
    height: 68,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 12,
  },
  relatedThumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  relatedDurationTag: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 2,
  },
  relatedDurationText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '500',
  },
  relatedVideoInfo: {
    flex: 1,
  },
  relatedVideoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  relatedChannelName: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  relatedStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  relatedStatText: {
    fontSize: 12,
    color: '#6B7280',
    marginRight: 4,
  },
});
