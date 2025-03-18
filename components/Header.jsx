import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import ComAvatar from './ComAvatar';
import { useCallback, useEffect, useState } from 'react';
import { AccountInfo } from '@/api/useApi';
import { useSession } from '@/auth/ctx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStorageState } from '@/auth/useStorageState';
export default function Header() {
  const [userName, setUserName] = useState('');
  const { session } = useSession();
  const [[isLoading, token], setSession] = useStorageState('token');

  console.log('isLoading 123', isLoading);
  console.log('token 123', token);
  console.log('AsyncStorage 123', AsyncStorage.getItem("token"));

  const fetchData = useCallback(async () => {
    if (session) {
      try {
        const response = await AccountInfo();
        setUserName(response?.fullname);
      } catch (error) {
        console.error('Error fetching account info:', error);
      }
    }
  }, [session]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        alignItems: 'center',
      }}
    >
      <TouchableOpacity style={styles.header}>
        <ComAvatar link={null} />
        <View style={styles.text}>
          <Text>Xin chào!</Text>
          <Text style={styles.textName}>{userName}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    flex: 6,
  },
  text: {
    flex: 1,
    marginLeft: 10,
  },
  textName: {
    fontWeight: 'bold',
    fontSize: 15,
  },
});
