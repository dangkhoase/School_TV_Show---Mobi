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
export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [schedules, setSchedules] = useState<ScheduleTimeline[]>([]);
  const [PostNews, setPostNews] = useState([]);

  const [liveEvents, setLiveEvents] = useState([]);
  const [featuredVideos, setFeaturedVideos] = useState([]);
  const [communityPosts, setCommunityPosts] = useState([]);
  const fetchData = useCallback(async () => {
    const response = await Schedules();
    const combined = await NewsCombined();
    const videoapi = await VideoHistoryActive();
    setSchedules(response.data.Upcoming.$values);
    setCommunityPosts(combined.$values);
    setFeaturedVideos(videoapi.$values);
    console.log(videoapi.$values);
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

        {/* Upcoming Events Section */}
        <UpcomingEventsSection events={schedules} />

        {/* Featured Videos Section */}
        <FeaturedVideosSection videos={featuredVideos} />

        {/* Community Posts Section */}
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
