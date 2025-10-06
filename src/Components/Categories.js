import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const Categories = ({ categories = [], onSelect }) => {
  return (
    <View style={styles.container}>

      <View style={styles.grid}>
        {categories.map((item) => (
          <TouchableOpacity
            key={item.name}
            style={styles.categoryItem}
            onPress={() => onSelect && onSelect(item.name)}
          >
            <Image source={item.image} style={styles.icon} />
            <Text style={styles.label}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 10 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  categoryItem: {
    width: '30%',
    alignItems: 'center',
    marginVertical: 10,
  },
  icon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    textAlign: 'center',
    color:'black'
  },
});

export default Categories;
