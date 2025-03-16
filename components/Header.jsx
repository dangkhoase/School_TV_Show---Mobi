import React from 'react'; 
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'; 
import ComAvatar from './ComAvatar';
export default function Header() { 
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        alignItems: 'center',
      }}
    >
      <TouchableOpacity
      
        style={styles.header}
      >
        <ComAvatar link={null} />
        <View style={styles.text}>
          <Text>Xin chào!</Text>
          <Text style={styles.textName}>{}</Text>
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
