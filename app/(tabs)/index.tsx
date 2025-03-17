'use dom';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import Header from '../../components/Header';
import TopPlacesCarousel from '../../components/ComImg/TopPlacesCarousel';
import { TOP_PLACES } from '@/data';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <TopPlacesCarousel list={TOP_PLACES} />
        <View style={{ height: 120 }}>
          <Text>ssss</Text>
        </View>
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
