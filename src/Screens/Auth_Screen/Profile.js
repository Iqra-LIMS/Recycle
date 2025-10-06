/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import {Text, View, ImageBackground} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getAuth, signOut} from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import Profile_button from '../../Components/Profile_button';
import splash from '../../Assets/new/splash.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({fullname: '', email: ''});

  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('UserData');
        if (savedUser) {
          const parsed = JSON.parse(savedUser);
          setUserData(parsed); // 👈 contains fullname & email
        }
      } catch (e) {
        console.log('Error reading user data:', e);
      }
    };

    loadUser();
  }, []);

  const handleSignOut = async () => {
    // try {
    const auth = getAuth();

    // Check if a user is signed in
    // if (!auth.currentUser) {
    //   Toast.show({
    //     type: 'info',
    //     text1: 'No user is currently signed in!',
    //     position: 'bottom',
    //     visibilityTime: 2000,
    //   });
    //   return;
    // }

    // Sign out the user
    // await signOut(auth);
    Toast.show({
      type: 'success',
      text1: 'User signed out successfully!',
      text2: 'You can now login!',
      position: 'bottom',
      visibilityTime: 2000,
    });

    // Navigate to SignIn screen and prevent going back
    navigation.replace('SignIn');
    // }
    // catch (error) {
    //   Toast.show({
    //     type: 'error',
    //     text1: 'Something went wrong!',
    //     text2: error.message,
    //     position: 'bottom',
    //     visibilityTime: 2500,
    //   });
    //   console.error('Error signing out:', error);
    // }
  };

  return (
    <ImageBackground
      source={splash}
      resizeMode="cover"
      style={{flex: 1, justifyContent: 'flex-end'}}>
      {/* White Form */}
      <View
        style={{
          backgroundColor: 'white',
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          padding: 24,
          width: '100%',
          alignItems: 'center',
          height: '60%',
          position: 'relative',
        }}>
        {/* Profile Info */}
        <View
          style={{
            position: 'absolute',
            top: -64,
            width: '100%',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 18, fontWeight: '600', color: 'white'}}>
            {userData.fullname || 'Full Name'}
          </Text>
          <Text style={{fontSize: 14, color: '#e0e0e0'}}>
            {userData.email || 'email@example.com'}
          </Text>
        </View>

        {/* Profile Buttons */}
        <Profile_button
          title="Edit Profile"
          imageSource={require('../../Assets/new/edit.png')}
          onPress={() => console.log('Edit Profile Pressed')}
          move={require('../../Assets/new/move.png')}
        />
        <View style={{height: 16}} />
        <Profile_button
          title="Privacy Policy"
          imageSource={require('../../Assets/new/privacy.png')}
          onPress={() => console.log('Privacy Policy Pressed')}
          move={require('../../Assets/new/move.png')}
        />
        <View style={{height: 16}} />
        <Profile_button
          title="Settings"
          imageSource={require('../../Assets/new/Settings.png')}
          onPress={() => console.log('Settings Pressed')}
          move={require('../../Assets/new/move.png')}
        />
        <View style={{height: 16}} />
        <Profile_button
          title="Logout"
          imageSource={require('../../Assets/new/logout.png')}
          onPress={handleSignOut}
          move={require('../../Assets/new/move.png')}
        />
      </View>
    </ImageBackground>
  );
};

export default Profile;

// /* eslint-disable prettier/prettier */
// import React from 'react';
// import {Text, View, ImageBackground} from 'react-native';
// import Profile_button from '../../Components/Profile_button';
// import splash from '../../Assets/new/splash.png';
// import {getAuth, signOut} from '@react-native-firebase/auth';
// import Toast from 'react-native-toast-message';
// const Profile = () => {
//   const handleSignOut = async ({navigation}) => {
//     try {
//       const auth = getAuth();
//       await signOut(auth);
//       console.log('User signed out successfully!');
//       Toast.show({
//         type: 'success',
//         text1: 'User signed out successfully!',
//         text2: 'You can now login!',
//         position: 'bottom',
//         visibilityTime: 2000,
//       });
//       navigation.navigate('SignIn');
//       // Optionally, navigate the user to a login screen or update UI state
//     } catch (error) {
//       Toast.show({
//         type: 'error',
//         text1: 'Something went wrong!',
//         text2: error.message,
//         position: 'bottom',
//         visibilityTime: 2500,
//       });
//       console.error('Error signing out:', error);
//     }
//   };
//   return (
//     <ImageBackground
//       source={splash}
//       resizeMode="cover"
//       className="flex-1 justify-end">
//       {/* White Form */}
//       <View className="bg-white rounded-t-[40px] p-6 w-full items-center h-[60%] relative">
//         {/* Profile Info OUTSIDE the form, above */}
//         <View className="absolute -top-16 w-full items-center">
//           <Text className="text-lg font-semibold text-white">Full Name</Text>
//           <Text className="text-base text-gray-200">email@example.com</Text>
//         </View>

//         <Profile_button
//           title="Edit Profile"
//           imageSource={require('../../Assets/new/edit.png')}
//           onPress={() => console.log('Edit Profile Pressed')}
//           move={require('../../Assets/new/move.png')}
//         />

//         <View className="h-4" />
//         <Profile_button
//           title="Privacy Policy"
//           imageSource={require('../../Assets/new/privacy.png')}
//           onPress={() => console.log('Edit Profile Pressed')}
//           move={require('../../Assets/new/move.png')}
//         />
//         <View className="h-4" />
//         <Profile_button
//           title="Settings"
//           imageSource={require('../../Assets/new/Settings.png')}
//           onPress={() => console.log('Settings Pressed')}
//           move={require('../../Assets/new/move.png')}
//         />

//         <View className="h-4" />

//         <Profile_button
//           title="Logout"
//           imageSource={require('../../Assets/new/logout.png')}
//           onPress={handleSignOut}
//           move={require('../../Assets/new/move.png')}
//         />
//       </View>
//     </ImageBackground>
//   );
// };

// export default Profile;
