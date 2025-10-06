/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import splash from '../../Assets/new/splash.png';

// Firebase Auth import
import auth from '@react-native-firebase/auth';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        // User already logged in -> Go to Home
        navigation.replace('Main');
      } else {
        // User not logged in -> Go to SignIn
        navigation.replace('SignIn');
      }
    });

    return unsubscribe; // cleanup
  }, [navigation]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={splash}
        resizeMode="cover"
        style={styles.background}>
        {/* Get Started Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.replace('SignIn')}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: '#98E630',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 15,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default SplashScreen;

// /* eslint-disable prettier/prettier */
// import React from 'react';
// import {
//   Text,
//   SafeAreaView,
//   ImageBackground,
//   TouchableOpacity,
//   StyleSheet,
// } from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import splash from '../../Assets/new/splash.png';

// const SplashScreen = () => {
//   const navigation = useNavigation();

//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <ImageBackground
//         source={splash}
//         resizeMode="cover"
//         style={styles.background}>
//         {/* App Title */}

//         {/* Get Started Button */}
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => navigation.replace('SignIn')}>
//           <Text style={styles.buttonText}>Get Started</Text>
//         </TouchableOpacity>
//       </ImageBackground>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     color: 'white',
//     fontSize: 32,
//     fontWeight: 'bold',
//   },
//   button: {
//     position: 'absolute',
//     bottom: 50, // distance from bottom
//     backgroundColor: '#98E630',
//     paddingVertical: 12,
//     paddingHorizontal: 30,
//     borderRadius: 15,
//   },
//   buttonText: {
//     color: 'black',
//     fontSize: 18,
//     fontWeight: '600',
//   },
// });

// export default SplashScreen;
