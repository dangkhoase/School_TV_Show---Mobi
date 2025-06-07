'use client';

import { getEventById } from '@/api/useApi';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
    ArrowLeft,
    BookmarkPlus,
    Building,
    Clock,
    Heart,
    Share2
} from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Program {
  $id: string;
  programID: number;
  schoolChannelID: number;
  cloudflareStreamId: string;
  programName: string;
  title: string;
  status: string;
  schoolChannel: any;
  createdAt: string;
  updatedAt: string;
}

interface Event {
  $id: string;
  scheduleID: number;
  programID: number;
  startTime: string;
  endTime: string;
  status: string;
  liveStreamStarted: boolean;
  liveStreamEnded: boolean;
  isReplay: boolean;
  thumbnail: string;
  videoHistoryID: number | null;
  program: Program;
}

export default function EventDetailScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('live');
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || Array.isArray(id)) return;
    
    setLoading(true);
    getEventById(id)
      .then((data) => {
        setEvent(data.data);
      })
      .catch((error) => {
        console.log('Error fetching event:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text style={styles.loadingText}>Đang tải...</Text>
      </View>
    );
  }

  if (!event) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text style={styles.loadingText}>Không tìm thấy sự kiện</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="light" />

      {/* Video Player */}
      <View style={styles.videoContainer}>
        <Image source={{ uri: event.thumbnail }} style={styles.videoThumbnail} />
        <View style={styles.videoOverlay} />

        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>

        {event.liveStreamStarted && !event.liveStreamEnded && (
          <View style={styles.liveIndicator}>
            <Text style={styles.liveText}>• LIVE</Text>
          </View>
        )}
      </View>

      {/* Event Info */}
      <View style={styles.eventInfoContainer}>
        <Text style={styles.eventTitle}>{event.program?.title || 'Không có tiêu đề'}</Text>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Clock size={16} color="#6B7280" />
            <Text style={styles.statText}>
              {formatDateTime(event.startTime)} - {formatDateTime(event.endTime)}
            </Text>
          </View>
        </View>

        <View style={styles.organizerRow}>
          <Building size={16} color="#6B7280" />
          <Text style={styles.organizerText}>{event.program?.programName || 'Không có tên chương trình'}</Text>
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
          <ScrollView style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>
              {event.program?.title || 'Không có tiêu đề'} - {event.program?.programName || 'Không có tên chương trình'}
            </Text>

            <View style={styles.eventDetailsContainer}>
              <View style={styles.detailRow}>
                <Clock size={16} color="#6B7280" />
                <Text style={styles.detailText}>
                  {formatDateTime(event.startTime)} - {formatDateTime(event.endTime)}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailText}>
                  Trạng thái: {event.status}
                </Text>
              </View>
            </View>
          </ScrollView>
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
