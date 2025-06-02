import { router } from 'expo-router';
import { Clock, Users } from 'lucide-react-native';
import type React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SectionHeader from './SectionHeader';

interface Program {
  programID: number;
  programName: string;
  title: string;
  schoolChannel: {
    name: string;
    logoUrl: string;
  };
}

interface LiveEvent {
  $id: string;
  scheduleID: number;
  programID: number;
  startTime: string;
  endTime: string;
  status: string;
  liveStreamStarted: boolean;
  liveStreamEnded: boolean;
  isReplay: boolean;
  thumbnail: string;
  videoHistoryID: number;
  program: Program;
}

interface LiveEventsSectionProps {
  events: LiveEvent[];
}

const LiveEventsSection: React.FC<LiveEventsSectionProps> = ({ events }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <View style={styles.container}>
      <SectionHeader linkto="/video" title="Đang Phát Sóng" actionText="Xem tất cả" />
      {events.length === 0 && (
        <View style={styles.noEventsContainer}>
          <Text style={styles.noEventsText}>Không có sự kiện nào đang phát sóng.</Text>
        </View>
      )}
      <View style={styles.eventsContainer}>
        {events.map((event) => (
          <TouchableOpacity
            onPress={() => router.push(`/video/${event.$id}`)}
            key={event.$id}
            style={styles.eventCard}
          >
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: event.thumbnail }}
                style={styles.image}
                alt={event.program.title}
              />
              {event.liveStreamStarted && !event.liveStreamEnded && (
                <View style={styles.liveTag}>
                  <Text style={styles.liveText}>• LIVE</Text>
                </View>
              )}
            </View>
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle} numberOfLines={2}>
                {event.program.title}
              </Text>
              <View style={styles.channelInfo}>
                <Image
                  source={{ uri: event.program.schoolChannel.logoUrl }}
                  style={styles.channelLogo}
                />
                <Text style={styles.channelName}>{event.program.schoolChannel.name}</Text>
              </View>
              <View style={styles.timeContainer}>
                <Clock size={16} color="#6B7280" />
                <Text style={styles.timeText}>
                  {formatDate(event.startTime)} - {formatDate(event.endTime)}
                </Text>
              </View>
              <View style={styles.viewsContainer}>
                <Users size={16} color="#6B7280" />
                <Text style={styles.viewsText}>
                  {event.liveStreamStarted && !event.liveStreamEnded ? 'Đang phát sóng' : 'Sắp phát sóng'}
                </Text>
              </View>
            </View>
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
    marginBottom: 8,
  },
  channelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  channelLogo: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  channelName: {
    fontSize: 14,
    color: '#666',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  timeText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  viewsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewsText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
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
});

export default LiveEventsSection;
