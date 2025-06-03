import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import ComAvatar from './ComAvatar';
import { useCallback, useEffect, useState } from 'react';
import { AccountInfo } from '@/api/useApi';
export default function Header() {
  const [userName, setUserName] = useState('');
  const fetchData = useCallback(async () => {
    try {
      const response = await AccountInfo();
      setUserName(response?.fullname);
    } catch (error) {
      console.error('Error fetching account info:', error);
    }
  }, []);
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
    flex: 2,
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
