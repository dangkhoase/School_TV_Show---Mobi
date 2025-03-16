import React from 'react';
import { Image, StyleSheet, View } from 'react-native'; 
export default function ComAvatar({ link }) {
  return (
    <View>
      {link ? (
        <Image source={{ uri: link }} style={styles.image} />
      ) : (
        <Image
          source={{
            uri: 'https://firebasestorage.googleapis.com/v0/b/careconnect-2d494.appspot.com/o/images%2F3be127ed-a90e-4364-8160-99338def0144.png?alt=media&token=3de8a6cb-0986-4347-9a22-eb369f7d02ff',
          }}
          style={styles.image}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    width: 58,
    height: 58,
    // objectFit: "fill",
    borderWidth: 0.5,
    borderColor: '#000',
    borderRadius: 50,
  },
});
