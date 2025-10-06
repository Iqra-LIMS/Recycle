/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ReusableTextInput from '../../Components/ReusableTextInput';
import ReusableButton from '../../Components/ReusableButton';

const Forget = ({navigation}) => {
  const [email, recoverEmail] = useState('');
  const [showModal, setShowModal] = useState(false);

  const screenWidth = Dimensions.get('window').width;
  const iconSize = Math.min(Math.max(screenWidth * 0.13, 32), 50); // Clamp icon size between 32 and 50

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

        {/* Content */}
        <View className="px-5 items-center mt-10">
          <Text className="text-black font-bold text-[26px] text-center">
            Forgot Password
          </Text>

          <Text
            className="text-black font-light text-[16px] mt-1 mb-5 text-center"
            numberOfLines={2}>
            Enter your email account to reset your password
          </Text>

          {/* Email Input */}
          <View className="w-full mb-6">
            <ReusableTextInput
              value={email}
              onChangeText={recoverEmail}
              placeholder="Email"
              keyboardType="email-address"
            />
          </View>

          {/* Button */}
          <View className="w-full">
            <ReusableButton
              title="Reset Password"
              onPress={() => setShowModal(true)}
            />
          </View>
        </View>
      </ScrollView>

      {/* Custom Modal Alert */}
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}>
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white w-[80%] rounded-xl p-6 items-center">
            <Image
              source={require('../../Assets/icons/alert.png')} // Replace with your image path
              style={{width: 80, height: 80, marginBottom: 16}}
              resizeMode="contain"
            />
            <Text className="text-[20px] font-bold text-black mb-2 text-center">
              Check your email
            </Text>
            <Text className="text-[14px] text-center text-gray-700 mb-4">
              We have sent password recovery instructions to your email
            </Text>
            <TouchableOpacity
              onPress={() => {
                setShowModal(false); // First close the modal
                setTimeout(() => {
                  navigation.navigate('Verification_Otp'); // Then navigate after short delay
                }, 100); // Delay helps in ensuring modal is unmounted
              }}
              className="bg-blue-600 rounded-md px-6 py-3 mt-2">
              <Text className="text-white font-semibold">OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Forget;
