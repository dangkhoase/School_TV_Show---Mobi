import { followSchool, getActiveSchools, getFollowedSchools, unfollowSchool } from '@/api/useApi';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Globe, Mail, MapPin, Phone, UserPlus } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface School {
  schoolChannelID: number;
  name: string;
  description: string;
  logoUrl: string;
  website: string;
  email: string;
  address: string;
  phoneNumber: string;
  followers: number;
  news: {
    $values: Array<{
      newsID: number;
      title: string;
      content: string;
      createdAt: string;
    }>;
  };
}

export default function SchoolDetailScreen() {
  const { id } = useLocalSearchParams();
  const [school, setSchool] = useState<School | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch school data
        const response = await getActiveSchools();
        const schoolData = response.$values.find(
          (s: School) => s.schoolChannelID === Number(id)
        );
        if (schoolData) {
          setSchool(schoolData);
        }

        // Check if school is followed
        const followedResponse = await getFollowedSchools();
        const followedSchools = followedResponse.$values || [];
        setIsFollowing(followedSchools.some((s: any) => s.schoolChannelID === Number(id)));
      } catch (error) {
        console.log('Error fetching data123:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await unfollowSchool(Number(id));
      } else {
        await followSchool(Number(id));
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.log('Error toggling follow:', error);
    }
  };

  if (!school) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết trường học</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* School Header with Background */}
        <View style={styles.schoolHeader}>
          <Image source={{ uri: school.logoUrl }} style={styles.headerBackground} />
          <View style={styles.headerOverlay}>
            <Image source={{ uri: school.logoUrl }} style={styles.logo} />
            <Text style={styles.schoolName}>{school.name}</Text>
            <TouchableOpacity
              style={[styles.followButton, isFollowing && styles.followingButton]}
              onPress={handleFollowToggle}
            >
              <UserPlus size={16} color={isFollowing ? "#fff" : "#6C63FF"} />
              <Text style={[styles.followButtonText, isFollowing && styles.followingButtonText]}>
                {isFollowing ? 'Đã theo dõi' : 'Theo dõi'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* School Info */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Thông tin trường học</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <View style={styles.iconContainer}>
                <Globe size={20} color="#6C63FF" />
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Website</Text>
                <Text style={styles.infoText}>{school.website}</Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.iconContainer}>
                <Mail size={20} color="#6C63FF" />
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoText}>{school.email}</Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.iconContainer}>
                <MapPin size={20} color="#6C63FF" />
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Địa chỉ</Text>
                <Text style={styles.infoText}>{school.address}</Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.iconContainer}>
                <Phone size={20} color="#6C63FF" />
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Điện thoại</Text>
                <Text style={styles.infoText}>{school.phoneNumber}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* School Description */}
        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>Giới thiệu</Text>
          <Text style={styles.descriptionText}>{school.description}</Text>
        </View>

        {/* News Section */}
        <View style={styles.newsSection}>
          <Text style={styles.sectionTitle}>Tin tức</Text>
          {school.news.$values.map((news, index) => (
            <TouchableOpacity key={index} style={styles.newsCard}>
              <Text style={styles.newsTitle}>{news.title}</Text>
              <Text style={styles.newsDate}>
                {new Date(news.createdAt).toLocaleDateString('vi-VN')}
              </Text>
              <Text style={styles.newsContent} numberOfLines={3}>
                {news.content}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  headerRight: {
    width: 40,
  },
  schoolHeader: {
    height: 300,
    position: 'relative',
  },
  headerBackground: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    opacity: 0.3,
  },
  headerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 16,
  },
  schoolName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  followButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  followingButton: {
    backgroundColor: '#6C63FF',
    borderColor: '#6C63FF',
  },
  followButtonText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 8,
  },
  followingButtonText: {
    color: '#fff',
  },
  infoSection: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 12,
    borderRadius: 12,
    marginHorizontal: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  infoContainer: {
    gap: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 16,
    color: '#111827',
  },
  descriptionSection: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 12,
    borderRadius: 12,
    marginHorizontal: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  descriptionText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  newsSection: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 12,
    marginBottom: 20,
    borderRadius: 12,
    marginHorizontal: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  newsCard: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  newsDate: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  newsContent: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
}); 