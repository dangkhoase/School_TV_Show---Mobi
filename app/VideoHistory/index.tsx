import { VideoHistory } from '@/types/videoHistory';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { ArrowLeft, Clock, Eye, Filter } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getAllVideoHistory } from '../../api/useApi';

interface VideoHistoryResponse {
  $id: string;
  $values: VideoHistory[];
}

export default function VideoHistoryScreen() {
  const [videos, setVideos] = useState<VideoHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchVideos = async (pageNum: number = 1, shouldRefresh: boolean = false) => {
    try {
      setLoading(true);
      const response = await getAllVideoHistory(pageNum);
      const data = response as VideoHistoryResponse;
      const newVideos = data.$values || [];
      
      if (shouldRefresh) {
        setVideos(newVideos);
      } else {
        setVideos(prev => [...prev, ...newVideos]);
      }
      
      setHasMore(newVideos.length > 0);
      setError(null);
    } catch (err) {
      setError('Không thể tải danh sách video. Vui lòng thử lại sau.');
      console.log('Error fetching videos:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
      fetchVideos(page + 1);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    fetchVideos(1, true);
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

  const renderVideoItem = ({ item }: { item: VideoHistory }) => (
    <TouchableOpacity
      onPress={() => router.push({
        pathname: "/VideoHistory/[id]",
        params: { id: item.videoHistoryID }
      })}
      style={styles.videoCard}
    >
      <View style={styles.thumbnailContainer}>
        <Image 
          source={{ 
            uri: item.schedules.$values[0]?.thumbnail || "https://picsum.photos/seed/5/300/180" 
          }} 
          style={styles.thumbnail}
          contentFit="cover"
        />
      </View>

      <View style={styles.videoInfo}>
        <View style={styles.profileContainer}>
          <Image 
            source={{ 
              uri: item.program.schoolChannel.logoUrl || "https://picsum.photos/seed/5/300/180"
            }} 
            style={styles.profileImage}
            contentFit="cover"
          />
          <View style={styles.titleContainer}>
            <Text style={styles.videoTitle} numberOfLines={2}>
              {item.program.title}
            </Text>
            <Text style={styles.channelName}>{item.program.schoolChannel.name}</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Eye size={20} color="#6B7280" />
            <Text style={styles.statText}>0 lượt xem</Text>
          </View>
          <View style={styles.statItem}>
            <Clock size={20} color="#6B7280" /> 
            <Text style={styles.timeText}>{formatDateTime(item.streamAt)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading && !refreshing && videos.length === 0) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error && videos.length === 0) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Video</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={videos}
        renderItem={renderVideoItem}
        keyExtractor={(item) => item.videoHistoryID.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        ListFooterComponent={() => (
          loading && !refreshing ? (
            <ActivityIndicator size="small" color="#0000ff" style={styles.loader} />
          ) : null
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  filterButton: {
    padding: 8,
  },
  listContainer: {
    padding: 16,
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
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  loader: {
    marginVertical: 20,
  },
}); 