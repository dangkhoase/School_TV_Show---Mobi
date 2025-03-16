import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

const Card = ({children, style, onPress, shadowType = 'light'}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card, style]}>
      <View style={styles.inner}>{children}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 200,
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowRadius: 4,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  inner: {
    width: '100%',
    height: '100%',
  },
});

export default Card;
