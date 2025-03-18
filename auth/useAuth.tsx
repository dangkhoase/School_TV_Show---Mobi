import React, { createContext, useCallback, useContext, ReactNode } from 'react';
import { Alert } from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { useFocusEffect } from '@react-navigation/native';
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
const AuthContext = createContext({});
async function registerForPushNotificationsAsync() {
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      Alert.alert('Permission not granted', 'Failed to get push token for push notification!');
      return;
    }
    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
      if (!projectId) {
        Alert.alert('Project ID not found', 'Project ID not found in configuration.');
        return;
      }
      const pushTokenData = await Notifications.getExpoPushTokenAsync({ projectId });
      return pushTokenData.data;
    } catch (error) {
      Alert.alert('Failed to get push token', (error as Error).message);
    }
  } else {
    Alert.alert('Physical device required', 'Must use physical device for push notifications.');
  }
}
import { useStorageState } from './useStorageState';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [[, user], setUser] = useStorageState('user');
  const [[, accessToken], ,] = useStorageState('token');
  const [[, expoPushToken], setExpoPushToken] = useStorageState('expoPushToken');

  const handExpoPushToken = useCallback(() => {
    const fetchPushToken = async () => {
      try {
        const token = await registerForPushNotificationsAsync();
        setExpoPushToken(token ?? '');
        console.log(123123, token);
      } catch (error) {
        Alert.alert('Error', `${error}`);
      }
    };

    fetchPushToken();
  }, [setExpoPushToken]);

  useFocusEffect(handExpoPushToken);

  return (
    <AuthContext.Provider value={{ user, setUser, accessToken, expoPushToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
