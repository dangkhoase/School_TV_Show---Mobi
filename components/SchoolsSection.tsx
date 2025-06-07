import { followSchool, unfollowSchool } from '@/api/useApi';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SectionHeader from './SectionHeader';

interface School {
  schoolChannelID: number;
  name: string;
  description: string;
  logoUrl: string;
  followers: number;
}

interface SchoolsSectionProps {
  schools: School[];
}

const SchoolsSection: React.FC<SchoolsSectionProps> = ({ schools }) => {
  const [followedSchools, setFollowedSchools] = useState<number[]>([]);

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
      console.log('Error toggling follow:', error);
    }
  };

  return (
    <View style={styles.container}>
      <SectionHeader linkto="/school" title="Trường Học" actionText="Xem tất cả" />
      {schools.length === 0 && (
        <View style={styles.noSchoolsContainer}>
          <Text style={styles.noSchoolsText}>Không có trường học nào.</Text>
        </View>
      )}
      <View style={styles.schoolsContainer}>
        {schools.map((school, index) => (
          <TouchableOpacity
          onPress={() => router.push(`/school/${school.schoolChannelID}`)}
            key={index}
            style={styles.schoolCard}
          >
            <Image 
              source={{ uri: school.logoUrl }} 
              style={styles.schoolLogo}
            />
            <View style={styles.schoolContent}>
              <Text style={styles.schoolName}>{school.name}</Text>
              <Text style={styles.schoolDescription} numberOfLines={2}>
                {school.description}
              </Text> 
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
  schoolsContainer: {
    marginTop: 10,
  },
  schoolCard: {
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
  schoolLogo: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  schoolContent: {
    padding: 12,
  },
  schoolName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  schoolDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  schoolFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
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
  noSchoolsContainer: {
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    marginBottom: 12,
  },
  noSchoolsText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
  },
});

export default SchoolsSection; 