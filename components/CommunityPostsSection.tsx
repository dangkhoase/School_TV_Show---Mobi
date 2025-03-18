import type React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'; 
import SectionHeader from './SectionHeader';
import { Heart, MessageCircle, Share2 } from 'lucide-react-native';
import { communityPosts } from '@/schemaForm/liveEvent';

interface CommunityPostsSectionProps {
  posts: communityPosts[];
}

const CommunityPostsSection: React.FC<CommunityPostsSectionProps> = ({ posts }) => {
  return (
    <View style={styles.container}>
      <SectionHeader title="Bài Viết Cộng Đồng" actionText="Xem tất cả" />

      <View style={styles.postsContainer}>
        {posts.map((post, index) => (
          <View key={index} style={styles.postCard}>
            <View style={styles.postHeader}>
              <Image source={{ uri: post.authorImageUrl }} style={styles.authorImage} />
              <View style={styles.authorInfo}>
                <Text style={styles.authorName}>{post.authorName}</Text>
                <Text style={styles.postTime}>{post.timeAgo} trước</Text>
              </View>
            </View>

            <Text style={styles.postContent}>{post.content}</Text>

            {post.imageUrl && <Image source={{ uri: post.imageUrl }} style={styles.postImage} />}

            <View style={styles.postActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Heart size={18} color="#666" />
                <Text style={styles.actionText}>{post.likes}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <MessageCircle size={18} color="#666" />
                <Text style={styles.actionText}>{post.comments}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Share2 size={18} color="#666" />
                <Text style={styles.actionText}>Chia sẻ</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  postsContainer: {
    marginTop: 10,
  },
  postCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
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
    marginRight: 10,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  postTime: {
    fontSize: 12,
    color: '#666',
  },
  postContent: {
    fontSize: 14,
    color: '#333',
    marginBottom: 12,
    lineHeight: 20,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
    resizeMode: 'cover',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
});

export default CommunityPostsSection;
