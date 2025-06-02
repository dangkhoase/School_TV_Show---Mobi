import { VideoHistory } from '@/types/videoHistory';
import { Video } from 'expo-av';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { Clock, Eye } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { getVideoHistoryById } from '../../api/useApi';

export default function VideoDetailScreen() {
  const { id } = useLocalSearchParams();
  const [video, setVideo] = useState<VideoHistory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchVideoDetails();
  }, [id]);

  const fetchVideoDetails = async () => {
    try {
      setLoading(true);
      const data = await getVideoHistoryById(id as string);
      setVideo(data);
      setError(null);
    } catch (err) {
      setError('Không thể tải thông tin video. Vui lòng thử lại sau.');
      console.error('Error fetching video details:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Lỗi: Định dạng ngày giờ không hợp lệ.';

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${hours}:${minutes}-${day}/${month}/${year}`;
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error || !video) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>{error || 'Không tìm thấy video'}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.videoContainer}>
        <Video
          source={{ uri: video.playbackUrl || '' }}
          style={styles.video}
          useNativeControls
          resizeMode="contain"
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{video.program.title}</Text>
        
        <View style={styles.channelInfo}>
          <Image 
            source={{ uri: video.program.schoolChannel.logoUrl || "https://picsum.photos/seed/5/300/180" }}
            style={styles.channelLogo}
            contentFit="cover"
          />
          <View style={styles.channelDetails}>
            <Text style={styles.channelName}>{video.program.schoolChannel.name}</Text>
            <Text style={styles.channelDescription}>{video.program.schoolChannel.description}</Text>
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

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Mô tả</Text>
          <Text style={styles.description}>{video.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16,
  },
  channelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  channelLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  channelDetails: {
    flex: 1,
  },
  channelName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  channelDescription: {
    fontSize: 14,
    color: '#666666',
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 4,
  },
  timeText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 4,
  },
  descriptionContainer: {
    marginTop: 16,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
}); 