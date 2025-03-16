import React from 'react';
import {Dimensions, FlatList, StyleSheet} from 'react-native';
const { width } = Dimensions.get('window');

const CARD_WIDTH = width - 80;
const CARD_WIDTH_SPACING = CARD_WIDTH + 24;

const Carousel = ({renderItem, items = []}) => {
  return (
    <FlatList
      data={items}
      horizontal
      style={styles.container}
      snapToInterval={CARD_WIDTH_SPACING}
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
      keyExtractor={i => i.id}
      renderItem={({item, index}) => {
        if (renderItem) {
          return renderItem({
            item,
            index,
            style: {
              width: CARD_WIDTH,
              marginLeft: 24,
              marginRight: index === items.length - 1 ? 24 : 0,
            },
          });
        }
        return null;
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
});

export default Carousel;
