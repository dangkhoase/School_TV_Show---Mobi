import { router } from 'expo-router';
import { Calendar } from 'lucide-react-native';
import type React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SectionHeader from './SectionHeader';

interface Program {
  title: string;
}

interface ScheduleTimeline {
  scheduleID: number;
  programID: number;
  startTime: string;
  endTime: string;
  status: string;
  thumbnail: string;
  program: Program;
}

interface UpcomingEventsSectionProps {
  events: ScheduleTimeline[];
}

const UpcomingEventsSection: React.FC<UpcomingEventsSectionProps> = ({ events }) => {
  function formatDateTime(dateString: string) {
    const date = new Date(dateString);

    // Kiểm tra nếu đối tượng Date không hợp lệ
    if (isNaN(date.getTime())) {
      return 'Lỗi: Định dạng ngày giờ không hợp lệ.';
    }
  
    // Lấy các thành phần giờ, phút
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    // Lấy các thành phần ngày, tháng, năm
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    // Định dạng theo yêu cầu: giờ:phút - ngày/tháng/năm
    const formattedDate = `${hours}:${minutes} - ${day}/${month}/${year}`;
    
    return formattedDate;
  }

  return (
    <View style={styles.container}>
      <SectionHeader linkto="/event" title="Sắp Diễn Ra" actionText="Xem tất cả" />

      <View style={styles.eventsContainer}>
        {events.map((event, index) => (
          <TouchableOpacity
            onPress={() => router.push(`/event/${event.scheduleID}`)}
            key={index}
            style={styles.eventCard}
          >
            <Image 
              source={{ uri: event.thumbnail }} 
              style={styles.eventImage}
            />
            <View style={styles.eventContent}>
              <Text style={styles.eventTitle}>{event.program.title}</Text>
              <View style={styles.dateContainer}>
                <Calendar size={16} color="#6C63FF" />
                <Text style={styles.dateText}>
                  {formatDateTime(event.startTime)}
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
  eventImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  eventContent: {
    padding: 12,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
    color: '#6C63FF',
    fontWeight: '500',
    marginLeft: 6,
  },
});

export default UpcomingEventsSection;
