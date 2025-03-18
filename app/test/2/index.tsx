import React from 'react';
import { View, Text, Button } from 'react-native';
import { useStorage } from '@/Context/StorageContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStorageState } from '@/auth/useStorageState';
import { saveToken } from '@/api/api';
import { router } from 'expo-router';

const App = () => {
  return (
    <View>
      <Button title="Save Token" onPress={() => saveToken("abc")} />
      <Button title="GO HOME" onPress={() => router.replace('/')} />
    </View>
  );
};

export default App;
