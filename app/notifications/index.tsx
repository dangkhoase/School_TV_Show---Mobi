import { View, Text, StyleSheet, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Heart, MessageCircle, UserPlus, Star } from 'lucide-react-native';

// Mock data for notifications
const notifications: Notification[] = [
  {
    id: '1',
    type: 'like',
    user: 'Minh Anh',
    content: 'liked your post',
    time: '2 minutes ago',
  },
  {
    id: '2',
    type: 'comment',
    user: 'Hoàng Nam',
    content: 'commented on your post',
    time: '15 minutes ago',
  },
  {
    id: '3',
    type: 'follow',
    user: 'Thùy Linh',
    content: 'started following you',
    time: '1 hour ago',
  },
  {
    id: '4',
    type: 'mention',
    user: 'Quang Huy',
    content: 'mentioned you in a comment',
    time: '3 hours ago',
  },
  {
    id: '5',
    type: 'like',
    user: 'Thanh Tâm',
    content: 'liked your comment',
    time: '5 hours ago',
  },
];

// Notification item component
interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention';
  user: string;
  content: string;
  time: string;
}

const NotificationItem = ({ item }: { item: Notification }) => {
  // Determine icon based on notification type
  const getIcon = () => {
    switch (item.type) {
      case 'like':
        return <Heart size={20} color="#FF4D67" />;
      case 'comment':
        return <MessageCircle size={20} color="#4A90E2" />;
      case 'follow':
        return <UserPlus size={20} color="#50C878" />;
      case 'mention':
        return <Star size={20} color="#FFD700" />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.notificationItem}>
      <View style={styles.iconContainer}>{getIcon()}</View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationText}>
          <Text style={styles.username}>{item.user}</Text> {item.content}
        </Text>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
    </View>
  );
};

export default function NotificationsScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>
      <FlatList
        data={notifications}
        renderItem={({ item }) => <NotificationItem item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  listContainer: {
    padding: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
    justifyContent: 'center',
  },
  notificationText: {
    fontSize: 14,
    marginBottom: 4,
    color: '#000000',
  },
  username: {
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 12,
    color: '#666666',
  },
});
