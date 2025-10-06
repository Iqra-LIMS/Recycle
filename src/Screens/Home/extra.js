/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const Scanner = () => {
  // ✅ removed <string | null>, just keep null
  const [imageUri, setImageUri] = useState(null);

  const handleCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        quality: 0.7,
      },
      response => {
        if (response.assets && response.assets.length > 0) {
          setImageUri(response.assets[0].uri || null);
        }
      },
    );
  };

  const handleGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.7,
      },
      response => {
        if (response.assets && response.assets.length > 0) {
          setImageUri(response.assets[0].uri || null);
        }
      },
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Upload Waste Image</Text>

      {imageUri ? (
        <Image source={{uri: imageUri}} style={styles.previewImage} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>No Image Selected</Text>
        </View>
      )}

      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.button} onPress={handleCamera}>
          <Text style={styles.btnText}>📷 Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, {backgroundColor: '#4CAF50'}]}
          onPress={handleGallery}>
          <Text style={styles.btnText}>🖼️ Gallery</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Scanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    color: '#333',
  },
  previewImage: {
    width: 250,
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  placeholder: {
    width: 250,
    height: 250,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#aaa',
  },
  btnContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
  },
});
