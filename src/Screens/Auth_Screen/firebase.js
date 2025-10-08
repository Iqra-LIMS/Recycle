/* eslint-disable prettier/prettier */
// src/firebase.js
import {initializeApp} from 'firebase/app';
import { initializeAuth, getReactNativePersistence, GoogleAuthProvider, signInWithCredential  } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';



// ✅ Your Firebase config from google-services.json
const firebaseConfig = {
  apiKey: 'AIzaSyCXn-MbRv16rZSyhABNV5MJ_GfutuQS_3w',
  authDomain: 'book-me-3e35e.firebaseapp.com',
  projectId: 'book-me-3e35e',
  storageBucket: 'book-me-3e35e.firebasestorage.app',
  messagingSenderId: '1027731436786',
  appId: '1:1027731436786:android:bc5040974157b81df5cc6b',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Export for use in your app
//export const auth = getAuth(app);
export const db = getFirestore(app);

// ✅ Configure Google Signin
GoogleSignin.configure({
  webClientId: '1027731436786-1v38tq65fm3mr1svqct11gu72ee6tm66.apps.googleusercontent.com', // 🔴 Get this from Firebase console
});

// ✅ Function to sign in with Google
export const signInWithGoogle = async () => {
  try {
    // Prompt Google Sign-in
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();

    // Get ID token
    const { idToken } = userInfo;
    const googleCredential = GoogleAuthProvider.credential(idToken);

    // Sign in with Firebase using Google credentials
    return await signInWithCredential(auth, googleCredential);
  } catch (error) {
    console.error('Google Sign-In Error:', error);
    throw error;
  }
};

GoogleSignin.signIn()
  .then(user => console.log("✅ User:", user))
  .catch(err => console.log("❌ Error:", err));