import type React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
 
import { Combined } from '@/types/combined';
import { router } from 'expo-router';
import SectionHeader from './SectionHeader';

interface CommunityPostsSectionProps {
  posts: Combined[];
}

const CommunityPostsSection: React.FC<CommunityPostsSectionProps> = ({ posts }) => {
    const formatDuration = (seconds: number) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  function formatDateTime(dateString: string) {
    const date = new Date(dateString);

    // Kiểm tra nếu đối tượng Date không hợp lệ
    if (isNaN(date.getTime())) {
      return 'Lỗi: Định dạng ngày giờ không hợp lệ.';
    }
  
    // Lấy các thành phần giờ, phút, giây
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    // Lấy các thành phần ngày, tháng, năm
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
  
    // Định dạng theo yêu cầu: giờ:phút:giây đến ngày/tháng/năm
    const formattedDate = `${hours}:${minutes}:${seconds}-${day}/${month}/${year}`;
    
    return formattedDate;
  }
  return (
    <View style={styles.container}>
      <SectionHeader linkto="/post" title="Bài Viết Cộng Đồng" actionText="Xem tất cả" />

      <View style={styles.postsContainer}>
        {posts.map((post, index) => (
          <TouchableOpacity
            onPress={() => router.push(`/post/${post.newsID}`)}
            key={index}
            style={styles.postCard}
          >
            <View style={styles.postHeader}>
              <Image source={{ uri: post.schoolChannel?.logoUrl || "https://picsum.photos/seed/undefined/32/32" }} style={styles.authorImage} />
              <View style={styles.authorInfo}>
                <Text style={styles.authorName}>{post?.schoolChannel?.name}</Text>
                <Text style={styles.postTime}>{formatDateTime(post.createdAt)}</Text>
              </View>
            </View>

            <Text style={[styles.postContent, { fontSize: 16, fontWeight: 'bold' }]}>{post.title}</Text>
            <Text style={styles.postContent}>{post.content}</Text>

            {post.newsPictures && <Image source={{ uri: `data:image/jpeg;base64,${post?.newsPictures?.$values[0]?.fileData}` }} style={styles.postImage} />}

          
          </TouchableOpacity>
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
    // fontSize: 14,
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
