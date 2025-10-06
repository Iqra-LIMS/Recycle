/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import ReusableButton from '../../Components/ReusableButton';
import OTPTextInput from 'react-native-otp-textinput';

const Verification_Otp = ({navigation}) => {
  const otpInput = useRef(null);
  const screenWidth = Dimensions.get('window').width;
  const iconSize = Math.min(Math.max(screenWidth * 0.13, 32), 50);

  const [timeLeft, setTimeLeft] = useState(90); // 90 seconds
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsExpired(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer); // Cleanup
  }, [timeLeft]);

  const formatTime = seconds => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 20,
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        {/* Back Button */}
        <View className="ml-5 mb-3">
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Image
              source={require('../../Assets/icons/Arrow.png')}
              style={{width: iconSize, height: iconSize}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Title and Description */}
        <View className="px-5 items-center mt-10">
          <Text className="text-black font-bold text-[26px] text-center mb-3">
            OTP Verification
          </Text>
          <Text className="text-black font-normal text-[16px] text-center mb-8 px-3">
            Please check your email{' '}
            <Text className="font-medium">test@gmail.com</Text> to see the
            verification code.
          </Text>
        </View>

        {/* OTP Input Section */}
        <View className="px-5 items-center">
          <Text className="text-black font-semibold text-[20px] mb-4 self-start">
            OTP Code
          </Text>

          <OTPTextInput
            ref={otpInput}
            inputCount={4}
            keyboardType="numeric"
            tintColor="#38393AFF"
            offTintColor="#E0E0E0"
            containerStyle={{
              marginBottom: 20,
              width: '100%',
              justifyContent: 'space-between',
              flexDirection: 'row',
              paddingHorizontal: 15,
            }}
            textInputStyle={{
              width: 60,
              height: 60,
              borderWidth: 2,
              borderColor: '#E0E0E0',
              borderRadius: 12,
              backgroundColor: '#F5F5F5',
              fontSize: 20,
              color: '#000',
              textAlign: 'center',
            }}
          />

          {/* Verify Button */}
          <View className="w-full">
            <ReusableButton
              title="Verify"
              onPress={() => console.log('Verify Pressed')}
              backgroundColor={isExpired ? 'bg-gray-400' : 'bg-blue-600'}
              textColor="text-white"
              disabled={isExpired}
            />
          </View>

          {/* Timer / Resend Info */}
          <View className="flex-row justify-between mt-5 w-full px-1">
            <Text className="text-black">Resend code to</Text>
            <Text className="text-black">{formatTime(timeLeft)}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Verification_Otp;
