/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {PERMISSIONS, request, check, RESULTS} from 'react-native-permissions';
import Geocoder from 'react-native-geocoding';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";


// Initialize Google Maps Geocoding API
Geocoder.init('AIzaSyA47FXlwil0jkNP-RHVRo78RSH7kil2GT0');

// assets
import splash from '../../Assets/new/splash.png';
import pickupImg from '../../Assets/new/pickup.png';
import recycleImg from '../../Assets/new/recycling.png';
import reduceImg from '../../Assets/new/ecology.png';
import reuseImg from '../../Assets/new/reuse.png';
import bellImg from '../../Assets/new/notification.png';
import locationImg from '../../Assets/new/loc.png';
import ServiceItem from '../../Components/ServiceItem';

const Main = () => {
  const [location, setLocation] = useState('Fetching location...');
  const [greeting, setGreeting] = useState('');
  const [loading, setLoading] = useState('');
  const navigation = useNavigation();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = await AsyncStorage.getItem("UserData");
        if (savedUser) {
          const parsed = JSON.parse(savedUser);
          setUserName(parsed.fullname); // 👈 get fullname
        }
      } catch (e) {
        console.log("Error reading user data:", e);
      }
    };

    loadUser();
  }, []);



  const handlePermissionDenied = () => {
    console.warn('Location permission denied');
    setPermissionError(
      'Location permission denied. Please enable location in settings.',
    );
  };

  useEffect(() => {
    // 1. Set Greeting According to Time
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting('Good Morning');
    } else if (hour >= 12 && hour < 17) {
      setGreeting('Good Afternoon');
    } else if (hour >= 17 && hour < 21) {
      setGreeting('Good Evening');
    } else {
      setGreeting('Good Night');
    }

    // 2. Get Current Location
    const requestLocationPermission = async () => {
      try {
        const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

        if (result === RESULTS.GRANTED) {
          // Permission already granted
          fetchData();
        } else {
          const permissionResult = await request(
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          );
          if (permissionResult === RESULTS.GRANTED) {
            fetchData();
          } else {
            handlePermissionDenied();
          }
        }
      } catch (error) {
        console.error(
          'Error checking or requesting location permission:',
          error,
        );
        setPermissionError('Error checking or requesting location permission');
      }
    };

    requestLocationPermission();
  }, []);

  const getCurrentPosition = () =>
    new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => resolve(position),
        error => reject(error),
        {enableHighAccuracy: false, timeout: 60000, maximumAge: 10000},
      );
    });

  const fetchData = async () => {
    setLoading(true);
    try {
      const position = await getCurrentPosition(); // ✅ works with await
      const {latitude, longitude} = position.coords;
      console.log('Lat:', latitude, 'Lng:', longitude);

      Geocoder.from(latitude, longitude)
        .then(json => {
          if (json.results.length > 0) {
            const components = json.results[0].address_components;

            let colony = '';
            let city = '';
            let country = '';

            components.forEach(c => {
              if (
                c.types.includes('sublocality') ||
                c.types.includes('neighborhood')
              ) {
                colony = c.long_name; // Lalarukh Colony
              }
              if (c.types.includes('locality')) {
                city = c.long_name; // Rawalpindi
              }
              if (c.types.includes('country')) {
                country = c.long_name; // Pakistan
              }
            });

            const shortAddress = [colony, city, country]
              .filter(Boolean)
              .join(', ');
            console.log('Short Address:', shortAddress);

            setLocation(shortAddress);
          }
        })
        .catch(error => console.warn(error));
    } catch (error) {
      console.log('Error getting location:', error);
      setPermissionError('Unable to fetch location. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePress = service => {
    console.log(`${service} pressed`);
    switch (service) {
      case 'Pickup':
        navigation.navigate('Pickup');
        break;
      case 'Recycle':
        navigation.navigate('Recycle');
        break;
      case 'Reduce':
        navigation.navigate('Reduce');
        break;
      case 'Reuse':
        navigation.navigate('Reuse');
        break;
      default:
        console.log('Unknown service');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header with splash image */}
      <ImageBackground
        source={splash}
        resizeMode="cover"
        style={{height: 150, width: '100%'}}
        imageStyle={{borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}>
        <View
          className="flex-row justify-between items-center px-5 py-4"
          style={{top: 25}}>
          <View style={{alignItems: 'center'}}>
            <Text className="text-white text-lg font-semibold">
              Greeting, {userName || "Guest"}
            </Text>
            <View className="flex-row items-center mt-1">
              <Image
                source={locationImg}
                style={{
                  width: 16,
                  height: 20,
                  marginRight: 5,
                  tintColor: 'white',
                }}
              />
              <Text className="text-white text-sm">{location}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              borderRadius: 50,
              height: 50,
              width: 50,
              alignItems: 'center',
            }}>
            <Image
              source={bellImg}
              style={{width: 24, height: 24, alignSelf: 'center', top: 10}}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* Greeting */}
      <View className="px-5 mt-6 items-center">
        <Text className="text-black text-[24px] font-semibold">{greeting}</Text>
        <Text className="text-gray-600 text-[16px] mt-1">
          Let’s save our planet together
        </Text>
        <Text className="text-green-600 font-medium mt-2">Ecobot tip</Text>
      </View>

      {/* Services */}
      <View className="mt-6 px-5">
        <Text className="text-lg font-semibold text-black mb-6 text-[24px]">
          Services:
        </Text>
        <View className="flex-row justify-between">
          <ServiceItem
            title="Pickup"
            image={pickupImg}
            onPress={() => handlePress('Pickup')}
          />
          <ServiceItem
            title="Recycle"
            image={recycleImg}
            onPress={() => handlePress('Recycle')}
          />
          <ServiceItem
            title="Reduce"
            image={reduceImg}
            onPress={() => handlePress('Reduce')}
          />
          <ServiceItem
            title="Reuse"
            image={reuseImg}
            onPress={() => handlePress('Reuse')}
          />
        </View>
      </View>

      {/* Recent Activity */}
      <View className="mt-8 px-5">
        <Text className="text-lg font-semibold text-black mb-3 text-[24px]">
          Recent Activity:
        </Text>
        <View className="bg-gray-100 p-4 rounded-xl shadow-md flex-row justify-between">
          <View>
            <Text className="text-gray-800 font-medium">Recycled plastic</Text>
            <Text className="text-gray-500 text-sm mt-1">12/4/25</Text>
          </View>
          <Text className="text-gray-500 text-sm self-center">05:00 PM</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Main;
