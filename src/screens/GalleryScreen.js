import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
} from 'react-native';
import { imagesData } from '../data/images';
import ImageCard from '../components/ImageCard';

const GalleryScreen = () => {
  const [search, setSearch] = useState('');

  const filteredImages = imagesData.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Galerie Mobile Premium
      </Text>

      <TextInput
        placeholder="Rechercher une image..."
        value={search}
        onChangeText={setSearch}
        style={styles.input}
      />

      <FlatList
        data={filteredImages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ImageCard item={item} />
        )}
        numColumns={2}
        initialNumToRender={6}
        maxToRenderPerBatch={4}
        windowSize={5}
      />
    </View>
  );
};

export default GalleryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0A2540',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 20,
    elevation: 2,
  },
});
