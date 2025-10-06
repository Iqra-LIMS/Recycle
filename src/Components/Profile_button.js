/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {TouchableOpacity, Text, View, Image} from 'react-native';

const Profile_button = ({title, imageSource, move, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-full flex-row items-center justify-between bg-[#d3d3d3] p-4 mb-4 rounded-xl"
      style={{
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        elevation: 3,
      }}>
      {/* Left side: background + icon + text */}
      <View className="flex-row items-center space-x-3">
        {/* Icon with white background image */}
        <View className="w-10 h-10 items-center justify-center">
          <Image
            source={require('../Assets/new/white-bg.png')} // 👈 white bg
            className="w-10 h-10 absolute"
            resizeMode="contain"
          />
          <Image
            source={imageSource}
            className="w-5 h-5"
            resizeMode="contain"
          />
        </View>

        {/* Title */}
        <Text className="text-base font-semibold text-gray-800">{title}</Text>
      </View>

      {/* Right arrow */}
      <Image source={move} className="w-6 h-6" resizeMode="contain" />
    </TouchableOpacity>
  );
};

export default Profile_button;
