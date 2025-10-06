/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, Text} from 'react-native';

const ReusableTextInput = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View
      style={{
        backgroundColor: '#F7F7F9',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        marginBottom: 20,
      }}>
      <TextInput
        className="py-4"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry && !isPasswordVisible}
        placeholderTextColor="#000"
        style={{
          flex: 1,
          paddingVertical: 14,
          paddingHorizontal: 7,
          color: '#000',
        }}
      />
      {secureTextEntry && (
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Text style={{color: '#10790F', fontSize: 14, paddingHorizontal: 10}}>
            {isPasswordVisible ? 'Hide' : 'Show'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ReusableTextInput;
