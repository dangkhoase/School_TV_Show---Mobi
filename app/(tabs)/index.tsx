import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import Header from '../../components/Header';
import TopPlacesCarousel from '../../components/ComImg/TopPlacesCarousel';
import { communityPosts, featuredVideos, liveEvents, TOP_PLACES, upcomingEvents } from '@/data';
import CommunityPostsSection from '@/components/CommunityPostsSection';
import LiveEventsSection from '@/components/LiveEventsSection';
import UpcomingEventsSection from '@/components/UpcomingEventsSection';
import FeaturedVideosSection from '@/components/FeaturedVideosSection';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
export default function HomeScreen() {
  const insets = useSafeAreaInsets();

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
        <UpcomingEventsSection events={upcomingEvents} />

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
