'use dom';
import { Button, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import Header from '../../components/Header';
import TopPlacesCarousel from '../../components/ComImg/TopPlacesCarousel';
import { communityPosts, featuredVideos, liveEvents, TOP_PLACES, upcomingEvents } from '@/data';
import { useEffect } from 'react';
import { useSession } from '@/auth/ctx';
import CommunityPostsSection from '@/components/CommunityPostsSection';
import LiveEventsSection from '@/components/LiveEventsSection';
import UpcomingEventsSection from '@/components/UpcomingEventsSection';
import FeaturedVideosSection from '@/components/FeaturedVideosSection';
export default function HomeScreen() {
  const { signIn, signOut } = useSession();

  useEffect(() => {
    setTimeout(() => {}, 10000);
  }, []);

  const hand = () => {
    signIn();
  };
  const logout = () => {
    signOut();
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header />
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
  footer: {
    height: 20,
  },
});
