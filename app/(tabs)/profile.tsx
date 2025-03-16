'use dom';
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Profile = () => (
  <View style={styles.container}>
    <Image
      style={styles.avatar}
      source={{ uri: 'https://example.com/avatar.jpg' }}
      alt="Profile avatar"
    />
    <View className="bg-red-800 rounded-xl">
      <Text className="text-lg font-medium text-red-800">Welcome to Tailwindsss</Text>
    </View>
    <Text style={styles.name}>John Doe</Text>
    <Text style={styles.bio}>Math enthusiast and competition winner.</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
  },
  bio: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Profile;
