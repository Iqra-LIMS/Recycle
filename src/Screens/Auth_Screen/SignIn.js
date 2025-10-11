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
import {doc, getDoc, setDoc} from 'firebase/firestore';
import {db} from '../Auth_Screen/firebase';

// Google Sign-In
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {GoogleAuthProvider, signInWithCredential} from 'firebase/auth';

// Reusable components
import ReusableTextInput from '../../Components/ReusableTextInput';
import ReusableButton from '../../Components/ReusableButton';

// Configure Google Sign-In
GoogleSignin.configure({
  webClientId: '1027731436786-nleiakfpt70ubhpc0slt7647d2jbd0e3.apps.googleusercontent.com', // Replace with your web client ID from Google Cloud Console
  offlineAccess: true,
  hostedDomain: '',
  forceCodeForRefreshToken: true,
});

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signingIn, setSigningIn] = useState(false);

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

      // Fetch profile from Firestore
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

  const handleGoogleLogin = async () => {
    if (signingIn) return;
    setSigningIn(true);

    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      
      // Get the user's ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const userCredential = await signInWithCredential(auth, googleCredential);
      const user = userCredential.user;

      // Check if user profile exists in Firestore
      const docRef = doc(db, 'profile', user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        // Create user profile in Firestore if it doesn't exist
        await setDoc(docRef, {
          fullname: user.displayName || '',
          email: user.email || '',
          createdAt: new Date(),
          provider: 'google',
        });
      }

      // Save user data to AsyncStorage
      await AsyncStorage.setItem(
        'UserData',
        JSON.stringify({
          fullname: user.displayName || '',
          email: user.email || '',
        }),
      );

      // Save credentials
      await AsyncStorage.setItem('userEmail', user.email || '');
      await AsyncStorage.setItem('userPassword', ''); // No password for Google login

      Toast.show({
        type: 'success',
        text1: 'Login Successful',
        text2: `Welcome ${user.displayName || 'User'}!`,
        position: 'bottom',
        visibilityTime: 2000,
        text1Style: {color: 'white'},
        text2Style: {color: 'white'},
        props: {style: {backgroundColor: 'green'}},
      });

      navigation.replace('Main');
    } catch (error) {
      console.log('Google Sign-In Error:', error);
      
      let errorMessage = 'Google login failed';
      
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        errorMessage = 'Google sign-in was cancelled';
      } else if (error.code === statusCodes.IN_PROGRESS) {
        errorMessage = 'Google sign-in already in progress';
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        errorMessage = 'Google Play Services not available';
      } else {
        errorMessage = error.message || 'Google login failed';
      }

      Toast.show({
        type: 'error',
        text1: 'Google Login Failed',
        text2: errorMessage,
        position: 'bottom',
        visibilityTime: 2500,
        text1Style: {color: 'white'},
        text2Style: {color: 'white'},
        props: {style: {backgroundColor: 'red'}},
      });
    } finally {
      setSigningIn(false);
    }
  };

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

              {/* Google Sign-In Button */}
              <TouchableOpacity
                onPress={handleGoogleLogin}
                disabled={signingIn}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '80%',
                  padding: 15,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  backgroundColor: 'white',
                  opacity: signingIn ? 0.6 : 1,
                }}>
                <Image
                  source={require('../../Assets/new/google.png')}
                  style={{width: 24, height: 24, marginRight: 10}}
                />
                <Text style={{color: 'black', fontSize: 16, fontWeight: '500'}}>
                  {signingIn ? 'Signing In...' : 'Continue with Google'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SignIn;