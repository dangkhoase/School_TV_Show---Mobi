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
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Heart, MessageCircle, Share2, Send } from 'lucide-react-native';

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
];

// Mock comments data
const commentsData = [
  {
    id: '1',
    postId: '1',
    authorName: 'Nguyễn Văn A',
    authorImageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    content: 'Xin chúc mừng các bạn! Thật tự hào về thành tích này.',
    timeAgo: '1 giờ',
    likes: 12,
  },
  {
    id: '2',
    postId: '1',
    authorName: 'Trần Thị B',
    authorImageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    content: 'Các bạn đã làm rất tốt! Hy vọng sẽ có nhiều thành công hơn nữa trong tương lai.',
    timeAgo: '45 phút',
    likes: 8,
  },
  {
    id: '3',
    postId: '1',
    authorName: 'Lê Văn C',
    authorImageUrl: 'https://randomuser.me/api/portraits/men/62.jpg',
    content: 'Thật tuyệt vời! Đây là minh chứng cho sự nỗ lực không ngừng của các bạn.',
    timeAgo: '30 phút',
    likes: 5,
  },
];

export default function PostDetailScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [likedComments, setLikedComments] = useState({});

  useEffect(() => {
    // Find the post by id
    const foundPost = communityPostsData.find((p) => p.id === id);
    if (foundPost) {
      setPost(foundPost);
    }

    // Filter comments for this post
    const postComments = commentsData.filter((c) => c.postId === id);
    setComments(postComments);
  }, [id]);

  const handleLikePost = () => {
    setLiked(!liked);
  };

  const handleLikeComment = (commentId) => {
    setLikedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const handleAddComment = () => {
    if (!commentText.trim()) return;

    const newComment = {
      id: String(comments.length + 1),
      postId: id,
      authorName: 'Bạn',
      authorImageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
      content: commentText,
      timeAgo: 'Vừa xong',
      likes: 0,
    };

    setComments([...comments, newComment]);
    setCommentText('');
  };

  if (!post) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text style={styles.loadingText}>Đang tải...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi Tiết Bài Viết</Text>
        <View style={styles.placeholder} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
        keyboardVerticalOffset={100}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.postCard}>
            <View style={styles.postHeader}>
              <Image source={{ uri: post.authorImageUrl }} style={styles.authorImage} />
              <View style={styles.authorInfo}>
                <Text style={styles.authorName}>{post.authorName}</Text>
                <Text style={styles.postTime}>{post.timeAgo} trước</Text>
              </View>
            </View>

            <Text style={styles.postContent}>{post.content}</Text>

            {post.imageUrl && <Image source={{ uri: post.imageUrl }} style={styles.postImage} />}

            <View style={styles.postStats}>
              <Text style={styles.statText}>
                {liked ? post.likes + 1 : post.likes} lượt thích • {comments.length} bình luận
              </Text>
            </View>

            <View style={styles.postActions}>
              <TouchableOpacity style={styles.actionButton} onPress={handleLikePost}>
                <Heart
                  size={20}
                  color={liked ? '#EF4444' : '#6B7280'}
                  fill={liked ? '#EF4444' : 'none'}
                />
                <Text style={[styles.actionText, liked && { color: '#EF4444' }]}>Thích</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <MessageCircle size={20} color="#6B7280" />
                <Text style={styles.actionText}>Bình luận</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Share2 size={20} color="#6B7280" />
                <Text style={styles.actionText}>Chia sẻ</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.commentsSection}>
            <Text style={styles.commentsTitle}>Bình luận ({comments.length})</Text>

            {comments.map((comment) => (
              <View key={comment.id} style={styles.commentItem}>
                <Image source={{ uri: comment.authorImageUrl }} style={styles.commentAuthorImage} />
                <View style={styles.commentContent}>
                  <View style={styles.commentBubble}>
                    <Text style={styles.commentAuthorName}>{comment.authorName}</Text>
                    <Text style={styles.commentText}>{comment.content}</Text>
                  </View>

                  <View style={styles.commentActions}>
                    <TouchableOpacity
                      style={styles.commentAction}
                      onPress={() => handleLikeComment(comment.id)}
                    >
                      <Text
                        style={[
                          styles.commentActionText,
                          likedComments[comment.id] && { color: '#EF4444' },
                        ]}
                      >
                        Thích
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.commentAction}>
                      <Text style={styles.commentActionText}>Phản hồi</Text>
                    </TouchableOpacity>
                    <Text style={styles.commentTime}>{comment.timeAgo}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={styles.inputContainer}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
            style={styles.inputAvatar}
          />
          <TextInput
            style={styles.commentInput}
            placeholder="Viết bình luận..."
            placeholderTextColor="#9CA3AF"
            value={commentText}
            onChangeText={setCommentText}
            multiline
          />
          <TouchableOpacity
            style={[styles.sendButton, !commentText.trim() && styles.sendButtonDisabled]}
            onPress={handleAddComment}
            disabled={!commentText.trim()}
          >
            <Send size={20} color={commentText.trim() ? '#FFFFFF' : '#9CA3AF'} />
          </TouchableOpacity>
        </View>
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
  placeholder: {
    width: 40,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  postCard: {
    padding: 16,
    borderBottomWidth: 8,
    borderBottomColor: '#F3F4F6',
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
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 240,
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
    fontSize: 14,
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
  commentsSection: {
    padding: 16,
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  commentAuthorImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentBubble: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 12,
  },
  commentAuthorName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  commentActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    paddingLeft: 8,
  },
  commentAction: {
    marginRight: 16,
  },
  commentActionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
  },
  commentTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    backgroundColor: '#FFFFFF',
  },
  inputAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  commentInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
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
  sendButtonDisabled: {
    backgroundColor: '#F3F4F6',
  },
});
