import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import Header from '../../components/Header';
import TopPlacesCarousel from '../../components/ComImg/TopPlacesCarousel';
import { communityPosts, featuredVideos, liveEvents, TOP_PLACES, upcomingEvents } from '@/data';
import CommunityPostsSection from '@/components/CommunityPostsSection';
import LiveEventsSection from '@/components/LiveEventsSection';
import UpcomingEventsSection from '@/components/UpcomingEventsSection';
import FeaturedVideosSection from '@/components/FeaturedVideosSection';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCallback, useEffect, useState } from 'react';
import { NewsCombined, Schedules, VideoHistoryActive } from '@/api/useApi';
import { ScheduleTimeline } from '@/types/authTypes';
import { VideoHistory } from '@/types/videoHistory';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [schedules, setSchedules] = useState<ScheduleTimeline[]>([]);
  const [PostNews, setPostNews] = useState([]);
  const [liveEvents, setLiveEvents] = useState([]);
  const [featuredVideos, setFeaturedVideos] = useState<VideoHistory[]>([]);
  const [communityPosts, setCommunityPosts] = useState([]);

  const fetchData = useCallback(async () => {
    const response = await Schedules();
    const combined = await NewsCombined();
    const videoapi = await VideoHistoryActive();
    
    // Limit to 3 items
    setSchedules(response.data.Upcoming.$values.slice(0, 3));
    setCommunityPosts(combined.$values.slice(0, 3));
    setFeaturedVideos(videoapi.$values.slice(0, 3));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Header />
      </View>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <TopPlacesCarousel list={TOP_PLACES} />
        <LiveEventsSection events={liveEvents} />
        <UpcomingEventsSection events={schedules} />
        <FeaturedVideosSection videos={featuredVideos} />
        <CommunityPostsSection posts={communityPosts} />
        <View style={styles.footer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  footer: {
    height: 20,
  },
});
