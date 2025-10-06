/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {doc, setDoc} from 'firebase/firestore';
import {auth, db} from '../Auth_Screen/firebase';
import Toast from 'react-native-toast-message';

// Reusable components
import ReusableTextInput from '../../Components/ReusableTextInput';
import ReusableButton from '../../Components/ReusableButton';

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!email || !name || !password) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'All fields are required',
        position: 'top',
        visibilityTime: 2500,
      });
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      await setDoc(doc(db, 'profile', user.uid), {
        fullname: name,
        email: email,
        password: password,
        createdAt: new Date(),
        uid: user.uid,
      });

      Toast.show({
        type: 'success',
        text1: 'Account Created',
        text2: 'You can now login!',
        position: 'bottom',
        visibilityTime: 2000,
      });

      setTimeout(() => {
        navigation.navigate('SignIn');
      }, 2200);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Signup Failed',
        text2: error.message,
        position: 'bottom',
        visibilityTime: 2500,
      });
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
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
                style={{color: '#10790F', fontWeight: 'bold', fontSize: 26}}>
                Register
              </Text>

              <View style={{marginTop: 15}}>
                <Text style={{color: 'black', fontSize: 14, marginBottom: 5}}>
                  Full Name
                </Text>
                <ReusableTextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter your username"
                  keyboardType="default"
                />

                <Text
                  style={{
                    color: 'black',
                    fontSize: 14,
                    marginTop: 15,
                    marginBottom: 12,
                  }}>
                  Email Address
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
                    marginBottom: 2,
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
                <ReusableButton
                  title={loading ? 'Loading...' : 'Create an Account'}
                  onPress={handleSignUp}
                  disabled={loading}
                />
              </View>
            </View>

            <View style={{marginTop: 10, alignItems: 'center', padding: 20}}>
              <View style={{flexDirection: 'row', marginBottom: 20}}>
                <Text style={{color: 'black', fontSize: 16, fontWeight: '300'}}>
                  Already have an account?{' '}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                  <Text
                    style={{
                      color: '#10790F',
                      fontWeight: 'bold',
                      fontSize: 16,
                    }}>
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SignUp;
