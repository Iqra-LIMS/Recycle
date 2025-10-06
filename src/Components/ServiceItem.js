/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

const ServiceItem = ({ title, image, onPress }) => {
  return (
    <TouchableOpacity className="items-center" onPress={onPress}>
      <Image
        source={image}
        style={{ width: 50, height: 50, resizeMode: 'contain' }}
      />
      <Text className="mt-2 text-gray-700">{title}</Text>
    </TouchableOpacity>
  );
};

export default ServiceItem;
