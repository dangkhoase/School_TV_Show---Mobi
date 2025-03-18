'use client';

import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Search, Filter, Calendar, MapPin, Users, Bell } from 'lucide-react-native';

// Mock data for upcoming events
const upcomingEventsData = [
  {
    id: '1',
    title: 'Lễ Trao Bằng Tốt Nghiệp 2023',
    date: '25/12/2023',
    time: '14:00',
    organizer: 'ĐH Quốc Gia Hà Nội',
    location: 'Hội trường A1',
    participants: 2000,
  },
  {
    id: '2',
    title: 'Cuộc thi Hackathon Blockchain 2025',
    date: '20/11/2023',
    time: '6:00',
    organizer: 'Tôn Đức Thắng',
    location: 'Sân trường',
    participants: 500,
  },
  {
    id: '3',
    title: 'Hội thảo: Trí Tuệ Nhân Tạo',
    date: '27/12/2023',
    time: '09:00',
    organizer: 'ĐH Bách Khoa Hà Nội',
    location: 'Phòng Hội Thảo C5',
    participants: 500,
  },
  {
    id: '4',
    title: 'Workshop: Kỹ năng mềm cho sinh viên',
    date: '05/01/2024',
    time: '13:30',
    organizer: 'ĐH Kinh Tế Quốc Dân',
    location: 'Hội trường B2',
    participants: 300,
  },
  {
    id: '5',
    title: 'Triển lãm Công nghệ 2024',
    date: '05/01/2024',
    time: '08:00',
    organizer: 'ĐH Công Nghệ',
    location: 'Nhà thi đấu ĐHQG',
    participants: 1500,
  },
];

export default function UpcomingEventsScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredEvents = upcomingEventsData.filter(
    (event) =>
      (event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.organizer.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (activeFilter === 'all' ||
        (activeFilter === 'workshop' && event.title.toLowerCase().includes('workshop')) ||
        (activeFilter === 'graduation' && event.title.toLowerCase().includes('tốt nghiệp')) ||
        (activeFilter === 'seminar' && event.title.toLowerCase().includes('hội thảo')))
  );

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate fetching data
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const renderEventItem = ({ item }) => (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() => router.push(`/event/${item.id}`)}
    >
      <View style={styles.upcomingTag}>
        <Text style={styles.upcomingText}>Sắp diễn ra</Text>
      </View>

      <View style={styles.dateContainer}>
        <Calendar size={16} color="#4A90E2" />
        <Text style={styles.dateText}>
          {item.date} - {item.time}
        </Text>
      </View>

      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text style={styles.organizerName}>{item.organizer}</Text>

      <View style={styles.eventDetails}>
        <View style={styles.detailItem}>
          <MapPin size={16} color="#6B7280" />
          <Text style={styles.detailText}>{item.location}</Text>
        </View>

        <View style={styles.detailItem}>
          <Users size={16} color="#6B7280" />
          <Text style={styles.detailText}>{item.participants} người tham gia</Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.detailButton}>
          <Text style={styles.detailButtonText}>Chi Tiết</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.reminderButton}>
          <Bell size={16} color="#4A90E2" />
          <Text style={styles.reminderButtonText}>Đặt Lịch Nhắc</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sự Kiện Sắp Diễn Ra</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#6B7280" />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm sự kiện..."
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.filterTabs}>
        <TouchableOpacity
          style={[styles.filterTab, activeFilter === 'all' && styles.activeFilterTab]}
          onPress={() => setActiveFilter('all')}
        >
          <Text
            style={[styles.filterTabText, activeFilter === 'all' && styles.activeFilterTabText]}
          >
            Tất Cả
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterTab, activeFilter === 'seminar' && styles.activeFilterTab]}
          onPress={() => setActiveFilter('seminar')}
        >
          <Text
            style={[styles.filterTabText, activeFilter === 'seminar' && styles.activeFilterTabText]}
          >
            Hội Thảo
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterTab, activeFilter === 'graduation' && styles.activeFilterTab]}
          onPress={() => setActiveFilter('graduation')}
        >
          <Text
            style={[
              styles.filterTabText,
              activeFilter === 'graduation' && styles.activeFilterTabText,
            ]}
          >
            Lễ Tốt Nghiệp
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterTab, activeFilter === 'workshop' && styles.activeFilterTab]}
          onPress={() => setActiveFilter('workshop')}
        >
          <Text
            style={[
              styles.filterTabText,
              activeFilter === 'workshop' && styles.activeFilterTabText,
            ]}
          >
            Workshop
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredEvents}
        renderItem={renderEventItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#6C63FF']}
            tintColor="#6C63FF"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {searchQuery
                ? 'Không tìm thấy sự kiện nào phù hợp'
                : 'Không có sự kiện nào sắp diễn ra'}
            </Text>
          </View>
        }
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  filterButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 16,
    height: 48,
    backgroundColor: '#F3F4F6',
    borderRadius: 24,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#111827',
  },
  filterTabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#F3F4F6',
  },
  activeFilterTab: {
    backgroundColor: '#6C63FF',
  },
  filterTabText: {
    fontSize: 14,
    color: '#6B7280',
  },
  activeFilterTabText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  listContent: {
    padding: 16,
  },
  eventCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  upcomingTag: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderTopLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  upcomingText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 8,
  },
  dateText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '500',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  organizerName: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  eventDetails: {
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#6B7280',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailButton: {
    flex: 1,
    height: 40,
    backgroundColor: '#6C63FF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  detailButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  reminderButton: {
    flex: 1,
    height: 40,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reminderButtonText: {
    color: '#4A90E2',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 6,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
});
