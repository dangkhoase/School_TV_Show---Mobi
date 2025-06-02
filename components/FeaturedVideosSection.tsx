import type React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import SectionHeader from './SectionHeader';
import { Clock, Eye } from 'lucide-react-native';
import { router } from 'expo-router';
import { VideoHistory } from '@/types/videoHistory';

interface FeaturedVideosSectionProps {
  videos: VideoHistory[];
}

const FeaturedVideosSection: React.FC<FeaturedVideosSectionProps> = ({ videos }) => {
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
    const formattedDate = `${hours}:${minutes}-${day}/${month}/${year}`;

    return formattedDate;
  }
  return (
    <View style={styles.container}>
      <SectionHeader linkto="/video" title="Video Nổi Bật" actionText="Xem tất cả" />

      <View style={styles.videosContainer}>
        {videos.map((video, index) => (
          <TouchableOpacity
            onPress={() => router.push(`/video/${video.$id}`)}
            key={index}
            style={styles.videoCard}
          >
            <View style={styles.thumbnailContainer}>
              <Image 
                source={{ 
                  uri: video.schedules.$values[0]?.thumbnail || "https://picsum.photos/seed/5/300/180" 
                }} 
                style={styles.thumbnail} 
              />
            </View>

            <View style={styles.videoInfo}>
              <View style={styles.profileContainer}>
                <Image 
                  source={{ 
                    uri: video.program.schoolChannel.logoUrl || "https://picsum.photos/seed/5/300/180"
                  }} 
                  style={styles.profileImage} 
                />
                <View style={styles.titleContainer}>
                  <Text style={styles.videoTitle} numberOfLines={2}>
                    {video.program.title}
                  </Text>
                  <Text style={styles.channelName}>{video.program.schoolChannel.name}</Text>
                </View>
              </View>

              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Eye size={20} color="#6B7280" />
                  <Text style={styles.statText}>0 lượt xem</Text>
                </View>
                <View style={styles.statItem}>
                  <Clock size={20} color="#6B7280" /> 
                  <Text style={styles.timeText}>{formatDateTime(video.streamAt)}</Text>
                  </View>
              </View>
            </View>
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
  videosContainer: {
    marginTop: 10,
  },
  videoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
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
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  videoInfo: {
    padding: 12,
  },
  profileContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  titleContainer: {
    flex: 1,
  },
  videoTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  channelName: {
    fontSize: 13,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIcon: {
    width: 14,
    height: 14,
    marginRight: 4,
  },
  statText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  timeText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
});

export default FeaturedVideosSection;
