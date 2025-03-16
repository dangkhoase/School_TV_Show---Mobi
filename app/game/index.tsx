'use dom';
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Games = () => (
  <View className="">
    <Image source={{ uri: 'https://example.com/avatar.jpg' }} alt="Profile avatar" />
    <Text className="text-">John Doe</Text>
    <div className="bg-slate-100 rounded-xl">
      <p className="text-lg font-medium text-gray-50">Welcome to Tailwind</p>
    </div>
    <Text>Math enthusiast and competition winner.</Text>
  </View>
);

export default Games;
