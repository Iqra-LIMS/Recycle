/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Platform,
  Linking,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import close from '../../../Assets/new/close.png';

// Haversine formula to calculate distance between 2 coordinates (km)
function getDistance(lat1, lon1, lat2, lon2) {
  const toRad = x => (x * Math.PI) / 180;
  const R = 6371; // Earth radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function NNearesLocation() {
  const [garbageLocations, setGarbageLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [nearestLocations, setNearestLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get current user location
  useEffect(() => {
    Geolocation.getCurrentPosition(
      pos => {
        setCurrentLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      error => console.log('Error getting location:', error),
      { enableHighAccuracy: false },
    );
  }, []);

  // Fetch Firestore data
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('GarbadgeLocation')
      .onSnapshot(querySnapshot => {
        const list = [];
        querySnapshot.forEach(doc => {
          const data = doc.data();
          list.push({
            id: doc.id,
            ...data,
            latitude: data.Location?._latitude,
            longitude: data.Location?._longitude,
          });
        });
        setGarbageLocations(list);
      });

    return () => unsubscribe();
  }, []);

  // Filter nearest recycling centers (within 20 km)
  useEffect(() => {
    if (currentLocation && garbageLocations.length > 0) {
      setLoading(true);

      const nearby = garbageLocations.filter(loc => {
        const dist = getDistance(
          currentLocation.latitude,
          currentLocation.longitude,
          loc.latitude,
          loc.longitude,
        );
        return dist <= 60;
      });

      const recyclingCenters = nearby.filter(
        loc => loc.category && loc.category.toLowerCase().includes('recycl'),
      );

      setNearestLocations(recyclingCenters);

      AsyncStorage.setItem('recyclingCenters', JSON.stringify(recyclingCenters))
        .then(() =>
          console.log('♻️ Recycling centers saved:', recyclingCenters),
        )
        .catch(err => console.log('Error saving recycling centers:', err))
        .finally(() => setLoading(false));
    }
  }, [currentLocation, garbageLocations]);

  // Open Google Maps
  const openGoogleMaps = (lat, lng, name) => {
    const url = Platform.select({
      ios: `http://maps.apple.com/?daddr=${lat},${lng}&dirflg=d`,
      android: `google.navigation:q=${lat},${lng}&mode=d`,
    });
    Linking.openURL(url);
  };

  return (
    <View style={{ flex: 1 }}>
      {currentLocation && (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}>
          {/* Current location marker */}
          <Marker
            coordinate={currentLocation}
            pinColor="blue"
            title="You are here"
          />

          {/* Recycling markers */}
          {nearestLocations.map(item => (
            <Marker
              key={item.id}
              coordinate={{ latitude: item.latitude, longitude: item.longitude }}
              title={item.name}
              description={item.city}
              pinColor="red"
              onPress={() => setSelectedLocation(item)}
            />
          ))}
        </MapView>
      )}

      {/* Loader while fetching */}
      {loading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" color="green" />
          <Text style={{ marginTop: 10, color: 'black' }}>
            Fetching recycling centers...
          </Text>
        </View>
      )}

      {/* Info box for selected marker */}
      {selectedLocation && (
        <View style={styles.infoBox}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSelectedLocation(null)}>
            <Image
              source={close}
              style={{
                width: 20,
                height: 20,
                alignSelf: 'center',
                top: 2,
                tintColor: 'white',
              }}
            />
          </TouchableOpacity>

          <Text style={styles.title}>{selectedLocation.name}</Text>
          <Text style={{ color: 'black' }}>🏙 City: {selectedLocation.city}</Text>
          <Text style={{ color: 'black' }}>
            🗑 Category: {selectedLocation.category}
          </Text>
          <Text style={{ color: 'black' }}>
            🌍 {selectedLocation.latitude}, {selectedLocation.longitude}
          </Text>

          <TouchableOpacity
            style={styles.directionButton}
            onPress={() =>
              openGoogleMaps(
                selectedLocation.latitude,
                selectedLocation.longitude,
                selectedLocation.name,
              )
            }>
            <Text style={styles.directionText}>Get Directions</Text>
          </TouchableOpacity>
        </View>
      )}

         {/* Legend */}
            <View style={styles.legend}>
              <Text style={styles.legendItem}>🔵 You</Text>
              <Text style={styles.legendItem}>🔴 Recycling Center</Text>
            </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoBox: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 15,
    right: 10,
    width: 40,
    height: 40,
    backgroundColor: 'red',
    borderRadius: 20,
    padding: 8,
    elevation: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
  },
  directionButton: {
    marginTop: 10,
    backgroundColor: 'green',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  directionText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
    legend: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    elevation: 5,
  },
  legendItem: {
    fontSize: 14,
    marginBottom: 4,
    color:'black'
  },
});
