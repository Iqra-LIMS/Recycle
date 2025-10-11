/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../Auth_Screen/firebase';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {doc, getDoc} from 'firebase/firestore';
import {db} from '../Auth_Screen/firebase';

// Reusable components
import ReusableTextInput from '../../Components/ReusableTextInput';
import ReusableButton from '../../Components/ReusableButton';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const loadCredentials = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem('userEmail');
        const savedPassword = await AsyncStorage.getItem('userPassword');

        if (savedEmail) setEmail(savedEmail);
        if (savedPassword) setPassword(savedPassword);
      } catch (error) {
        console.log('Error loading credentials:', error);
      }
    };

    loadCredentials();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter email and password',
        position: 'bottom',
        visibilityTime: 2000,
        text1Style: {color: 'white'},
        text2Style: {color: 'white'},
        props: {style: {backgroundColor: 'red'}},
      });
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      await AsyncStorage.setItem('userEmail', email);
      await AsyncStorage.setItem('userPassword', password);

      // 👇 Fetch profile from Firestore
      const docRef = doc(db, 'profile', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();

        // Save to AsyncStorage
        await AsyncStorage.setItem(
          'UserData',
          JSON.stringify({
            fullname: userData.fullname,
            email: userData.email,
          }),
        );

        console.log('Saved to AsyncStorage:', userData);
      } else {
        console.log('No such user profile!');
      }

      Toast.show({
        type: 'success',
        text1: 'Login Successful',
        text2: 'Welcome back!',
        position: 'bottom',
        visibilityTime: 2000,
        text1Style: {color: 'white'},
        text2Style: {color: 'white'},
        props: {style: {backgroundColor: 'green'}},
      });

      navigation.replace('Main');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: error.message,
        position: 'bottom',
        visibilityTime: 2500,
        text1Style: {color: 'white'},
        text2Style: {color: 'white'},
        props: {style: {backgroundColor: 'red'}},
      });
    }
  };

  //  const handleGoogleLogin = async () => {
  //     if (signingIn) return; // prevent double tap
  //     setSigningIn(true);

  //     try {
  //       const result = await signInWithGoogle();
  //       console.log('✅ User signed in with Google:', result.user);
  //       navigation.replace("Main");

  //     } catch (error) {
  //       if (error.message?.includes("Sign-in in progress")) {
  //         console.log("⏳ Google sign-in already in progress...");
  //       } else {
  //         console.log('❌ Error:', error);
  //       }
  //     } finally {
  //       setSigningIn(false);
  //     }
  //   };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={require('../../Assets/new/splash.png')}
        resizeMode="cover"
        style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
              marginTop: 200,
              borderTopLeftRadius: 60,
              borderTopRightRadius: 60,
              paddingVertical: 30,
              paddingHorizontal: 20,
            }}>
            <View style={{padding: 15}}>
              <Text
                style={{
                  color: '#10790F',
                  fontWeight: 'bold',
                  fontSize: 26,
                }}>
                Login
              </Text>

              <View style={{marginTop: 20}}>
                <Text style={{color: 'black', fontSize: 14, marginBottom: 5}}>
                  Email
                </Text>
                <ReusableTextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                />

                <Text
                  style={{
                    color: 'black',
                    fontSize: 14,
                    marginTop: 15,
                    marginBottom: 5,
                  }}>
                  Password
                </Text>
                <ReusableTextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  secureTextEntry
                />
              </View>

              <View style={{marginTop: 20}}>
                <ReusableButton title="Login" onPress={handleLogin} />
              </View>
            </View>

            {/* Footer */}
            <View style={{marginTop: 10, alignItems: 'center', padding: 20}}>
              <View style={{flexDirection: 'row', marginBottom: 20}}>
                <Text style={{color: 'black', fontSize: 16, fontWeight: '300'}}>
                  Don't have an account?{' '}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                  <Text
                    style={{
                      color: '#10790F',
                      fontWeight: 'bold',
                      fontSize: 16,
                    }}>
                    Register
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Divider with "Or" */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  marginVertical: 20,
                }}>
                <View style={{flex: 1, height: 1, backgroundColor: '#ccc'}} />
                <Text
                  style={{
                    marginHorizontal: 10,
                    color: 'black',
                    fontSize: 16,
                    fontWeight: '500',
                  }}>
                  Or
                </Text>
                <View style={{flex: 1, height: 1, backgroundColor: '#ccc'}} />
              </View>

              {/* Google Icon */}
              <TouchableOpacity
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#ccc',
                }}>
                <Image
                  source={require('../../Assets/new/google.png')}
                  style={{width: 30, height: 30, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SignIn;
