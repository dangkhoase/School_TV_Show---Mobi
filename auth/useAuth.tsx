import React, { createContext, useCallback, useContext } from 'react';
import { useStorage } from '../hooks/useLocalStorage';
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
import { ReactNode } from 'react';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser, removeUser] = useStorage('user', null);
  const [role, setRole, removeRole] = useStorage('role', null);
  const [elders, setElders, removeElders] = useStorage('elders', []);
  const [contracts, setContracts, removeContracts] = useStorage('contracts', []);
  const [accessToken, , removeAccessToken] = useStorage('token', null);
  const [expoPushToken, setExpoPushToken, removeExpoPushToken] = useStorage('expoPushToken', '');

  interface UserData {
    elders: any[];
    contracts: any[];
    roles: string[];
    [key: string]: any;
  }

  const login = (userData: UserData, expoPushToken: string) => {
    setUser({ ...userData });
    setExpoPushToken(expoPushToken);
  };

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
  const logout = async () => {
    await removeUser();
    await setUser(null);
    await removeAccessToken();
    await removeElders();
    await removeContracts();
    await removeRole();
    await removeExpoPushToken();
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, logout, contracts, elders, accessToken, role, expoPushToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
