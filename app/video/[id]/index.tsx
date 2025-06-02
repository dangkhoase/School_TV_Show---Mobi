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
import { getVideoHistoryById } from '@/api/useApi';
import { VideoHistory } from '@/types/videoHistory';

export default function VideoDetailScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const [video, setVideo] = useState<VideoHistory | null>(null);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [saved, setSaved] = useState(false);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  useEffect(() => {
    if (!id) return;
    getVideoHistoryById(id as string)
      .then((data) => setVideo(data))
      .catch(() => setVideo(null));
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
        <Image source={{ uri: video.schedules?.$values?.[0]?.thumbnail || 'https://picsum.photos/seed/5/300/180' }} style={styles.videoThumbnail} />
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
          <Text style={styles.videoTitle}>{video.program?.title}</Text>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Eye size={16} color="#6B7280" />
              <Text style={styles.statText}>0 lượt xem</Text>
            </View>
            <View style={styles.statItem}>
              <Clock size={16} color="#6B7280" />
              <Text style={styles.statText}>{video.streamAt}</Text>
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
                {liked ? 1 : 0}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={handleDislike}>
              <ThumbsDown
                size={20}
                color={disliked ? '#EF4444' : '#6B7280'}
                fill={disliked ? '#EF4444' : 'none'}
              />
              <Text style={[styles.actionText, disliked && styles.dislikedText]}>
                {disliked ? 1 : 0}
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
          <Image source={{ uri: video.program?.schoolChannel?.logoUrl || 'https://picsum.photos/seed/5/300/180' }} style={styles.channelImage} />
          <View style={styles.channelInfo}>
            <Text style={styles.channelName}>{video.program?.schoolChannel?.name}</Text>
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
          {/* Có thể fetch thêm video liên quan ở đây nếu muốn */}
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
