import type React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import SectionHeader from './SectionHeader';
import { FeaturedVideos } from '@/schemaForm/liveEvent';
import { Eye } from 'lucide-react-native';
import { router } from 'expo-router';

interface FeaturedVideosSectionProps {
  videos: FeaturedVideos[];
}

const FeaturedVideosSection: React.FC<FeaturedVideosSectionProps> = ({ videos }) => {
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <View style={styles.container}>
      <SectionHeader linkto="/video" title="Video Nổi Bật" actionText="Xem tất cả" />

      <View style={styles.videosContainer}>
        {videos.map((video, index) => (
          <TouchableOpacity
            onPress={() => router.push(`/video/${video.id}`)}
            key={index}
            style={styles.videoCard}
          >
            <View style={styles.thumbnailContainer}>
              <Image source={{ uri: video.thumbnailUrl }} style={styles.thumbnail} />
              <View style={styles.durationTag}>
                <Text style={styles.durationText}>{formatDuration(video.durationSeconds)}</Text>
              </View>
            </View>

            <View style={styles.videoInfo}>
              <View style={styles.profileContainer}>
                <Image source={{ uri: video.profileImageUrl }} style={styles.profileImage} />
                <View style={styles.titleContainer}>
                  <Text style={styles.videoTitle} numberOfLines={2}>
                    {video.title}
                  </Text>
                  <Text style={styles.channelName}>{video.channelName}</Text>
                </View>
              </View>

              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Eye size={20} color="#6B7280" />
                  {/* <Image source={require('../../assets/icons/eye.png')} style={styles.statIcon} /> */}
                  <Text style={styles.statText}>{video.viewCount} lượt xem</Text>
                </View>
                <Text style={styles.timeText}>{video.timeAgo} trước</Text>
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
  },
  timeText: {
    fontSize: 12,
    color: '#666',
  },
});

export default FeaturedVideosSection;
