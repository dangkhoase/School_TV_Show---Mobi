import { followSchool, getActiveSchools, getFollowedSchools, unfollowSchool } from '@/api/useApi';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import { ArrowLeft, Building2, Search, UserPlus } from 'lucide-react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface School {
  schoolChannelID: number;
  name: string;
  description: string;
  logoUrl: string;
  followers: number;
}

export default function SchoolsScreen() {
  const [schools, setSchools] = useState<School[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [followedSchools, setFollowedSchools] = useState<number[]>([]);

  const fetchData = async () => {
    try {
      // Fetch all schools
      const response = await getActiveSchools();
      setSchools(response.$values);

      // Fetch followed schools
      const followedResponse = await getFollowedSchools();
      const followed = followedResponse.$values || [];
      setFollowedSchools(followed.map((s: any) => s.schoolChannelID));
    } catch (error) {
      // console.error('Error fetching data321:', error);
    }
  };

  // Tải dữ liệu khi component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Tải lại dữ liệu mỗi khi quay lại trang
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const handleFollowToggle = async (schoolId: number) => {
    try {
      if (followedSchools.includes(schoolId)) {
        await unfollowSchool(schoolId);
        setFollowedSchools(prev => prev.filter(id => id !== schoolId));
      } else {
        await followSchool(schoolId);
        setFollowedSchools(prev => [...prev, schoolId]);
      }
    } catch (error) {
      console.error('Error toggling follow:', error);
    }
  };

  const filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    school.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trường Học</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search size={20} color="#6B7280" />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm trường học..."
          placeholderTextColor="#000000"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredSchools.length === 0 ? (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>Không tìm thấy trường học nào.</Text>
          </View>
        ) : (
          <View style={styles.schoolsContainer}>
            {filteredSchools.map((school) => (
              <TouchableOpacity
                key={school.schoolChannelID}
                style={styles.schoolCard}
                onPress={() => router.push(`/school/${school.schoolChannelID}`)}
              >
                <Image source={{ uri: school.logoUrl }} style={styles.schoolLogo} />
                <View style={styles.schoolContent}>
                  <Text style={styles.schoolName}>{school.name}</Text>
                  <Text style={styles.schoolDescription} numberOfLines={2}>
                    {school.description}
                  </Text>
                  <View style={styles.schoolFooter}>
                    <View style={styles.followersContainer}>
                      <Building2 size={16} color="#6C63FF" />
                      <Text style={styles.followersText}>
                        {school.followers} người theo dõi
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={[
                        styles.followButton,
                        followedSchools.includes(school.schoolChannelID) && styles.followingButton
                      ]}
                      onPress={() => handleFollowToggle(school.schoolChannelID)}
                    >
                      <UserPlus size={16} color={followedSchools.includes(school.schoolChannelID) ? "#fff" : "#6C63FF"} />
                      <Text style={[
                        styles.followButtonText,
                        followedSchools.includes(school.schoolChannelID) && styles.followingButtonText
                      ]}>
                        {followedSchools.includes(school.schoolChannelID) ? 'Đã theo dõi' : 'Theo dõi'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
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
    width: 40, // To balance the back button
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#111827',
  },
  schoolsContainer: {
    padding: 16,
  },
  schoolCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  schoolLogo: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  schoolContent: {
    padding: 16,
  },
  schoolName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  schoolDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  schoolFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  followersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  followersText: {
    fontSize: 14,
    color: '#6C63FF',
    marginLeft: 6,
  },
  followButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#6C63FF',
  },
  followingButton: {
    backgroundColor: '#6C63FF',
  },
  followButtonText: {
    fontSize: 14,
    color: '#6C63FF',
    marginLeft: 4,
  },
  followingButtonText: {
    color: '#fff',
  },
  noResultsContainer: {
    padding: 32,
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
}); 