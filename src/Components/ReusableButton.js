/* eslint-disable prettier/prettier */
// components/ReusableButton.js
import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

const ReusableButton = ({
  title,
  onPress,
  backgroundColor = 'bg-[#10790F]', // default Tailwind class
  textColor = 'text-white',
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-full py-4 items-center ${backgroundColor} opacity-90 blur-12`}
      style={{borderRadius: 40}} // 👈 fixed radius 20
    >
      <Text className={`text-base font-semibold ${textColor}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ReusableButton;
