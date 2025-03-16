import React from 'react';
import {Text, View, StyleSheet} from 'react-native'; 
import {SharedElement} from 'react-navigation-shared-element';
import Card from './Card/Card'; 
import CardMedia from './Card/CardMedia';
import Carousel from './Carousel'; 
const CARD_HEIGHT = 200;

const TopPlacesCarousel = ({list}) => (
    <Carousel
      items={list}
      renderItem={({item, style}) => 
          <Card
            style={[styles.card, style]}
            shadowType="dark"
            onPress={() => {
              // navigation.navigate("Homes", { screen: "AddingServicePackages" })
            }}>
            {/* <CardFavoriteIcon active={false} onPress={() => { }} /> */}
            <SharedElement
              id={`trip.${item.id}.image`}
              style={StyleSheet.absoluteFillObject}>
              <CardMedia source={item.image} borderBottomRadius />
            </SharedElement>
            <View style={styles.titleBox}>
              <Text style={styles.title}>{item.title}</Text>
            </View>
          </Card>
      }
    />
  );

const styles = StyleSheet.create({
  card: {
    height: CARD_HEIGHT,
  },
  titleBox: {
    position: 'absolute',
    top: CARD_HEIGHT - 70,
    left: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  location: {
    fontSize: 16,
    color: '#fff',
  },
});

export default TopPlacesCarousel;
