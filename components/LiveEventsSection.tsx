import type React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import SectionHeader from './SectionHeader';
import { LiveEvent } from '@/schemaForm/liveEvent';
import { Eye } from 'lucide-react-native';
import { router } from 'expo-router';

interface LiveEventsSectionProps {
  events: LiveEvent[];
}

const LiveEventsSection: React.FC<LiveEventsSectionProps> = ({ events }) => {
  return (
    <View style={styles.container}>
      <SectionHeader linkto="/video" title="Đang Phát Sóng" actionText="Xem tất cả" />
      {events.length === 0 && (
        <View style={styles.noEventsContainer}>
          <Text style={styles.noEventsText}>Không có sự kiện nào đang phát sóng.</Text>
        </View>
      )}
      <View style={styles.eventsContainer}>
        {events.map((event, index) => (
          <TouchableOpacity
            onPress={() => router.push(`/video/${event.id}`)}
            key={index}
            style={styles.eventCard}
          >
            <View style={styles.imageContainer}>
              <Image source={{ uri: event.imageUrl }} style={styles.image} alt={event.title} />
              <View style={styles.liveTag}>
                <Text style={styles.liveText}>• LIVE</Text>
              </View>
            </View>
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle} numberOfLines={2}>
                {event.title}
              </Text>
              <Text style={styles.eventOrganizer}>{event.organizer}</Text>
              <View style={styles.viewsContainer}>
                <Eye size={20} color="#6B7280" />
                <Text style={styles.viewsText}>{event.viewCount} người xem</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  noEventsContainer: {
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    marginBottom: 12,
  },
  noEventsText: { 
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
  },
  container: {
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  eventsContainer: {
    marginTop: 10,
  },
  eventCard: {
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
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  liveTag: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#ff3b30',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  liveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  eventInfo: {
    padding: 12,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  eventOrganizer: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  viewsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  viewsText: {
    fontSize: 12,
    color: '#666',
  },
});

export default LiveEventsSection;
