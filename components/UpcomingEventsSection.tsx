import type React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'; 
import SectionHeader from './SectionHeader';
import { Calendar, MapPin, Users } from 'lucide-react-native';
import { UpcomingEvents } from '@/schemaForm/liveEvent';
import { router } from 'expo-router';

interface UpcomingEventsSectionProps {
  events: UpcomingEvents[];
}

const UpcomingEventsSection: React.FC<UpcomingEventsSectionProps> = ({ events }) => {
  return (
    <View style={styles.container}>
      <SectionHeader linkto="/event" title="Sắp Diễn Ra" actionText="Xem tất cả" />

      <View style={styles.eventsContainer}>
        {events.map((event, index) => (
          <TouchableOpacity
            onPress={() => router.push(`/event/${event.id}`)}
            key={index}
            style={styles.eventCard}
          >
            <View style={styles.dateContainer}>
              <Calendar size={16} color="#4a90e2" />
              <Text style={styles.dateText}>
                {event.date} - {event.time}
              </Text>
            </View>

            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.eventOrganizer}>{event.organizer}</Text>

            <View style={styles.locationContainer}>
              <MapPin size={16} color="#666" />
              <Text style={styles.locationText}>{event.location}</Text>
            </View>

            <View style={styles.participantsContainer}>
              <Users size={16} color="#666" />
              <Text style={styles.participantsText}>{event.participants} người tham gia</Text>
            </View>

            <TouchableOpacity style={styles.reminderButton}>
              <Text style={styles.reminderButtonText}>Đặt Lịch Nhắc</Text>
            </TouchableOpacity>
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
  eventsContainer: {
    marginTop: 10,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dateText: {
    fontSize: 14,
    color: '#4a90e2',
    fontWeight: '500',
    marginLeft: 6,
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
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  participantsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  participantsText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  reminderButton: {
    backgroundColor: '#4a90e2',
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: 'center',
  },
  reminderButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default UpcomingEventsSection;
