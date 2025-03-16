import React from 'react';
import {View, StyleSheet} from 'react-native';

const CardContent = ({children, style}) => {
  return <View style={[styles.content, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 18,
    paddingVertical: 24 / 2,
  },
});

export default CardContent;
