/* eslint-disable prettier/prettier */
// src/firebase.js
import {initializeApp} from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


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
