/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screens
import splash_screen from './src/Screens/Splash/splash_screen';
import SignIn from './src/Screens/Auth_Screen/SignIn';
import SignUp from './src/Screens/Auth_Screen/SignUp';
import forget from './src/Screens/Auth_Screen/Forget';
import Verification_Otp from './src/Screens/Auth_Screen/Verification_Otp';
import BottomTabs from './src/Components/BottomsTab';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import Reduce from './src/Screens/Home/ChildScreens/Reduce';
import Reuse from './src/Screens/Home/ChildScreens/Reuse';
import Recycle from './src/Screens/Home/ChildScreens/Recycle';
import Pickup from './src/Screens/Home/ChildScreens/Pickup';
import Header from './src/Components/Header';
import Dates from './src/Screens/Home/ChildScreens/Dates';
import Contact from './src/Screens/Home/ChildScreens/Contact';
import Review from './src/Screens/Home/ChildScreens/Review';
import Sucessfull from './src/Screens/Home/ChildScreens/Sucessfull';
import RecycleGuide from './src/Screens/Home/ChildScreens/RecycleGuide';
import EditProfile from './src/Screens/Home/ChildScreens/EditProfile';
import Setting from './src/Screens/Home/ChildScreens/Setting';
import PrivacyPolicy from './src/Screens/Home/ChildScreens/PrivacyPolicy';
const Stack = createNativeStackNavigator();
const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={{borderLeftColor: 'green', backgroundColor: 'green'}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}
      text2Style={{fontSize: 14, color: 'white'}}
    />
  ),
  error: props => (
    <ErrorToast
      {...props}
      style={{borderLeftColor: 'red', backgroundColor: 'red'}}
      text1Style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}
      text2Style={{fontSize: 14, color: 'white'}}
    />
  ),
};
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        {/* Auth + Onboarding Screens */}
        <Stack.Screen
          name="Splash"
          component={splash_screen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="forget"
          component={forget}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Verification_Otp"
          component={Verification_Otp}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Main" // ✅ Unique name
          component={BottomTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Pickup"
          component={Pickup}
          options={({navigation}) => ({
            header: () => (
              <Header
                title="Pickup Services"
                subtitle="Schedule your pickup for waste"
                onBackPress={() => navigation.goBack()}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Recycle"
          component={Recycle}
          options={({navigation}) => ({
            header: () => (
              <Header
                title="Recycling Services"
                subtitle="learn what can & can’t recycle"
                onBackPress={() => navigation.goBack()}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Reuse"
          component={Reuse}
          options={({navigation}) => ({
            header: () => (
              <Header
                title="Reuse Services"
                subtitle="learn what can & can’t reuse"
                onBackPress={() => navigation.goBack()}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Reduce"
          component={Reduce}
          options={({navigation}) => ({
            header: () => (
              <Header
                title="Reduce Services"
                subtitle="learn how we can reduce"
                onBackPress={() => navigation.goBack()}
              />
            ),
          })}
        />

        <Stack.Screen
          name="Dates"
          component={Dates}
          options={({navigation}) => ({
            header: () => (
              <Header
                title="Select Date and Time"
                subtitle=""
                onBackPress={() => navigation.goBack()}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Contact"
          component={Contact}
          options={({navigation}) => ({
            header: () => (
              <Header
                title="Select Date and Time"
                subtitle=""
                onBackPress={() => navigation.goBack()}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Review"
          component={Review}
          options={({navigation}) => ({
            header: () => (
              <Header
                title="Review Pickup"
                subtitle=""
                onBackPress={() => navigation.goBack()}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Sucessfull"
          component={Sucessfull}
          options={({navigation}) => ({
            header: () => (
              <Header
                title="Success"
                subtitle=""
                onBackPress={() => navigation.goBack()}
              />
            ),
          })}
        />

        <Stack.Screen
          name="RecycleGuide"
          component={RecycleGuide}
          options={({navigation}) => ({
            header: () => (
              <Header
                title="Recycling Services"
                subtitle="learn what can & can’t recycle"
                onBackPress={() => navigation.goBack()}
              />
            ),
          })}
        />
         <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={({navigation}) => ({
            header: () => (
              <Header
                title="Edit Profile"
                subtitle=""
                onBackPress={() => navigation.goBack()}
              />
            ),
          })}
        />
         <Stack.Screen
          name="Setting"
          component={Setting}
          options={({navigation}) => ({
            header: () => (
              <Header
                title="Settings"
                subtitle=""
                onBackPress={() => navigation.goBack()}
              />
            ),
          })}
        />
         <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}
          options={({navigation}) => ({
            header: () => (
              <Header
                title="Privacy Policy"
                subtitle="Terms & Condition, Disclaimer "
                onBackPress={() => navigation.goBack()}
              />
            ),
          })}
        />
      </Stack.Navigator>
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
}
