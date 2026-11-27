import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
} from 'react-native';

const ImageCard = ({ item }) => {
  // La View extérieure porte la place dans la grille (48 % + marges).
  // L'ImageBackground la remplit entièrement : si elle recevait elle-même
  // width: '48%', React Native recopierait ce 48 % sur l'image de fond,
  // qui ne couvrirait alors que 48 % de la carte.
  return (
    <View style={styles.card}>
      <ImageBackground
        source={
          typeof item.image === 'string' ? { uri: item.image } : item.image
        }
        style={styles.image}
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
    </View>
  );
};

export default ImageCard;

const styles = StyleSheet.create({
  card: {
    width: '48%',
    height: 220,
    margin: '1%',
  },
  image: {
    flex: 1,
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
