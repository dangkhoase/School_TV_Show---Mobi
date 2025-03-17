'use dom';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';

import Header from '../../components/Header';
import TopPlacesCarousel from '../../components/ComImg/TopPlacesCarousel';
import { TOP_PLACES } from '@/data';
import { useEffect } from 'react';
import { router } from 'expo-router';
import { useSession } from '@/auth/ctx';
export default function HomeScreen() {
  const { session, isLoading, signIn, signOut } = useSession();

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
    <View style={styles.container}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <TopPlacesCarousel list={TOP_PLACES} />
        <View style={{ height: 120 }}>
          <Button onPress={() => hand()} title="signIn" />
        </View>
        <Button onPress={() => logout()} title="signOut" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
});
