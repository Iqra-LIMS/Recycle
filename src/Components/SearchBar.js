import React from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';

const SearchBar = ({ placeholder = "Search", value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../Assets/TabIcons/Group.png')} // 👈 make sure to add a search icon here
        style={styles.icon}
      />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#161616ff"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E0E0', // light grey background
    borderRadius: 10, // rounded corners
    paddingHorizontal: 12,
    height: 60,
    marginHorizontal: 16,
    marginVertical: 10,
  },
  icon: {
    width: 22,
    height: 22,
    tintColor: '#000000ff', // grey color
    marginRight: 8,
    resizeMode: 'contain',
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
});

export default SearchBar;
