import React from 'react';
import { Image, View, StyleSheet } from 'react-native'; 
const CardMedia = ({ source, borderBottomRadius = false }) => {
  return (
    <View
      style={[styles.media].concat(
        borderBottomRadius ? styles.borderBottomRadius : null,
      )}>
      <View style={styles.halfBackground} />
      <Image style={styles.image} source={source} />
    </View>
  );
};

const styles = StyleSheet.create({
  media: {
    flex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  borderBottomRadius: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  halfBackground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '40%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Change this color as needed
    zIndex: 1, 
  },
});

export default CardMedia;
