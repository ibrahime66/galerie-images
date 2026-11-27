import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
} from 'react-native';

const ImageCard = ({ item }) => {
  return (
    <ImageBackground
      source={{ uri: item.image }}
      style={styles.card}
      imageStyle={{ borderRadius: 20 }}
    >
      <View style={styles.overlay}>
        <Text style={styles.text}>
          {item.title}
        </Text>

        <Text style={styles.category}>
          {item.category}
        </Text>
      </View>
    </ImageBackground>
  );
};

export default ImageCard;

const styles = StyleSheet.create({
  card: {
    width: '48%',
    height: 220,
    margin: '1%',
    justifyContent: 'flex-end',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  category: {
    color: '#ddd',
  },
});
