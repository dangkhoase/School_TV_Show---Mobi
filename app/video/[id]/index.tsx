'use client';

import { LivesById, getVideoComments, postComment } from '@/api/useApi';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  ArrowLeft,
  BookmarkPlus,
  Clock,
  Eye,
  Send,
  Share2,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';

interface Program {
  $id: string;
  programID: number;
  programName: string;
  title: string;
  channel: any;
}

interface Schedule {
  $id: string;
  scheduleID: number;
  startTime: string;
  endTime: string;
  status: string;
  isReplay: boolean;
  liveStreamStarted: boolean;
  liveStreamEnded: boolean;
  programID: number;
  thumbnail: string;
  videoHistoryIdFromSchedule: number;
  videoHistoryPlaybackUrl: string | null;
  videoHistoryId: number | null;
  iframeUrl: string;
  duration: number | null;
  description: string | null;
  mp4Url: string;
  program: Program;
}

interface ApiResponse {
  data: {
    $id: string;
    $values: Schedule[];
  };
}

interface Comment {
  $id: string;
  commentID: number;
  content: string;
  createdAt: string;
}

interface CommentResponse {
  $id: string;
  $values: Comment[];
}

export default function VideoDetailScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const [liveData, setLiveData] = useState<Schedule | null>(null);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [saved, setSaved] = useState(false);
  const webViewRef = useRef<WebView>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchComments = (videoId: number) => {
    setLoadingComments(true);
    getVideoComments(videoId)
      .then((commentResponse: CommentResponse) => {
        setComments(commentResponse.$values || []);
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      })
      .finally(() => {
        setLoadingComments(false);
      });
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim() || !liveData?.videoHistoryIdFromSchedule) return;

    setIsSubmitting(true);
    try {
      await postComment({
        content: newComment.trim(),
        videoHistoryID: liveData.videoHistoryIdFromSchedule
      });
      setNewComment('');
      // Refresh comments immediately after posting
      fetchComments(liveData.videoHistoryIdFromSchedule);
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    LivesById(id as string)
      .then((response: ApiResponse) => {
        if (response.data?.$values?.[0]) {
          const schedule = response.data.$values[0];
          setLiveData(schedule);
          // Fetch comments if videoHistoryIdFromSchedule exists
          if (schedule.videoHistoryIdFromSchedule) {
            // Fetch comments immediately
            fetchComments(schedule.videoHistoryIdFromSchedule);
            
            // Set up interval to fetch comments every 2 seconds
            const intervalId = setInterval(() => {
              fetchComments(schedule.videoHistoryIdFromSchedule);
            }, 2000);

            // Clean up interval when component unmounts
            return () => clearInterval(intervalId);
          }
        }
      })
      .catch((error) => {
        console.error('Error fetching live data:', error);
        setLiveData(null);
      });
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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

  if (!liveData) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text style={styles.loadingText}>Đang tải...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <StatusBar style="light" />

        {/* Video Player */}
        <View style={styles.videoContainer}>
          <WebView
            ref={webViewRef}
            source={{ uri: liveData.iframeUrl }}
            style={styles.video}
            allowsFullscreenVideo
            javaScriptEnabled
            domStorageEnabled
          />

          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={styles.contentContainer} 
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Video Info */}
          <View style={styles.videoInfoContainer}>
            <Text style={styles.videoTitle}>{liveData.program.title}</Text>

            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Eye size={16} color="#6B7280" />
                <Text style={styles.statText}>0 lượt xem</Text>
              </View>
              <View style={styles.statItem}>
                <Clock size={16} color="#6B7280" />
                <Text style={styles.statText}>
                  {formatDate(liveData.startTime)} - {formatDate(liveData.endTime)}
                </Text>
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

          {/* Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>
              {liveData.description || 'Không có mô tả'}
            </Text>
          </View>

          {/* Comments Section */}
          <View style={styles.commentsContainer}>
            <Text style={styles.commentsTitle}>Bình luận ({comments.length})</Text>
            
            {/* Comment Input */}
            <View style={styles.commentInputContainer}>
              <TextInput
                style={styles.commentInput}
                placeholder="Viết bình luận..."
                value={newComment}
                onChangeText={setNewComment}
                multiline
                maxLength={500}
              />
              <TouchableOpacity
                style={[styles.sendButton, (!newComment.trim() || isSubmitting) && styles.sendButtonDisabled]}
                onPress={handleSubmitComment}
                disabled={!newComment.trim() || isSubmitting}
              >
                <Send
                  size={20}
                  color={!newComment.trim() || isSubmitting ? '#9CA3AF' : '#6C63FF'}
                />
              </TouchableOpacity>
            </View>

            {comments.length > 0 ? (
              comments.map((comment) => (
                <View key={comment.$id} style={styles.commentItem}>
                  <View style={styles.commentContent}>
                    <Text style={styles.commentText}>{comment.content}</Text>
                    <Text style={styles.commentTime}>
                      {new Date(comment.createdAt).toLocaleString('vi-VN')}
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.noCommentsText}>Chưa có bình luận nào</Text>
            )}
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
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
    height: Dimensions.get('window').width * 0.5625, // 16:9 aspect ratio
    position: 'relative',
    backgroundColor: '#000',
  },
  video: {
    flex: 1,
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
    zIndex: 1,
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
  commentsContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  commentItem: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  commentContent: {
    flex: 1,
  },
  commentText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  commentTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  noCommentsText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 16,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
  },
  commentInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    fontSize: 14,
    color: '#374151',
    paddingHorizontal: 12,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});
