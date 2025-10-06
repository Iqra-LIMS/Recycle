/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import axios from 'axios';
import firestore from '@react-native-firebase/firestore'; // ✅ Firestore native
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Linking, Platform} from 'react-native';
import locationImg from '../../Assets/new/loc.png';

const {width} = Dimensions.get('window');

const classColors = {
  plastic: '#2196F3', // blue
  glass: '#4CAF50', // green
  paper: '#FF9800', // orange
  cardboard: '#8D6E63', // brown
  metal: '#9E9E9E', // gray
  default: '#9C27B0', // purple
};

const Scanner = () => {
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [recommendations, setRecommendations] = useState({});
  const [savedCenters, setSavedCenters] = useState([]);

  // 🔹 Open Google Maps for selected location
  const openGoogleMaps = (lat, lng, name) => {
    const url = Platform.select({
      ios: `http://maps.apple.com/?daddr=${lat},${lng}&dirflg=d`,
      android: `google.navigation:q=${lat},${lng}&mode=d`,
    });
    Linking.openURL(url);
  };

  useEffect(() => {
    const loadCenters = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('recyclingCenters');
        if (jsonValue != null) {
          setSavedCenters(JSON.parse(jsonValue));
          console.log('♻️ Loaded recycling centers:', JSON.parse(jsonValue));
        }
      } catch (e) {
        console.log('Error loading recycling centers:', e);
      }
    };
    loadCenters();
  }, []);

  // 🔹 Fetch recommendations from Firestore
  useEffect(() => {
    if (result?.predictions && result.predictions.length > 0) {
      const uniqueClasses = [
        ...new Set(result.predictions.map(item => item.class)),
      ];

      const fetchAll = async () => {
        const recos = {};
        await Promise.all(
          uniqueClasses.map(async cls => {
            try {
              const docSnap = await firestore()
                .collection('Recommendation')
                .doc(cls.toLowerCase())
                .get();
              recos[cls] = docSnap.exists ? docSnap.data() : null;
            } catch (error) {
              console.error('Error fetching recommendation:', error);
              recos[cls] = null;
            }
          }),
        );
        setRecommendations(recos);
      };

      fetchAll();
    }
  }, [result]);

  // 🔹 Send selected image to Roboflow API
  const sendToAPI = async uri => {
    try {
      setLoading(true);
      setResult(null);
      const base64Image = await RNFS.readFile(uri, 'base64');
      const response = await axios({
        method: 'POST',
        url: 'https://serverless.roboflow.com/waste-ycgep/2',
        params: {api_key: 'oz9uEptBsCtpc3tEvOm2'},
        data: base64Image,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      });
      console.log('API Response:', response.data);
      setResult(response.data);
    } catch (err) {
      console.log('Upload error:', err.message);
      setResult({error: err.message});
    } finally {
      setLoading(false);
    }
  };

  const handleCamera = () => {
    launchCamera({mediaType: 'photo', quality: 0.7}, response => {
      if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        setImageUri(uri);
        sendToAPI(uri);
      }
    });
  };

  const handleGallery = () => {
    launchImageLibrary({mediaType: 'photo', quality: 0.7}, response => {
      if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        setImageUri(uri);
        sendToAPI(uri);
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.heading}>♻️ Smart Waste Scanner</Text>
        <Text style={styles.subHeading}>
          Upload or capture a waste image to detect type and learn how to
          recycle responsibly.
        </Text>

        {imageUri ? (
          <Image source={{uri: imageUri}} style={styles.previewImage} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>No Image Selected</Text>
          </View>
        )}

        {loading && (
          <ActivityIndicator
            size="large"
            color="#2196F3"
            style={{marginVertical: 10}}
          />
        )}

        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.button} onPress={handleCamera}>
            <Text style={styles.btnText}>📷 Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, {backgroundColor: '#4CAF50'}]}
            onPress={handleGallery}>
            <Text style={styles.btnText}>🖼️ Gallery</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.resultBox}>
          {result?.error ? (
            <Text style={styles.errorText}>❌ Error: {result.error}</Text>
          ) : (
            <>
              <Text style={styles.resultTitle}>✅ Detected Waste Types:</Text>
              {result?.predictions && result.predictions.length > 0 ? (
                [...new Set(result.predictions.map(item => item.class))].map(
                  (cls, index) => {
                    const color =
                      classColors[cls.toLowerCase()] || classColors.default;
                    return (
                      <View key={index} style={styles.wasteBlock}>
                        <View style={[styles.chip, {backgroundColor: color}]}>
                          <Text style={styles.chipText}>{cls}</Text>
                        </View>

                        {recommendations[cls] ? (
                          <View>
                            <View style={styles.recommendBox}>
                              <Text style={styles.recommendText}>
                                ➖ <Text style={styles.bold}>Reduce:</Text>{' '}
                                {recommendations[cls].reduce}
                              </Text>
                              <Text style={styles.recommendText}>
                                🔄 <Text style={styles.bold}>Reuse:</Text>{' '}
                                {recommendations[cls].reuse}
                              </Text>
                            </View>
                            <View style={styles.recommendBox}>
                              <Text style={styles.recommendText}>
                                ♻️{' '}
                                <Text style={styles.bold}>
                                  Recycle Centers:
                                </Text>
                              </Text>

                              {savedCenters && savedCenters.length > 0 ? (
                                savedCenters.map((center, i) => (
                                  <View key={i} style={[styles.centerRow, {flexDirection:'row', justifyContent:'space-between'}]}>
                                    <Text style={styles.recommendText}>
                                      • {center.name} ({center.city})
                                    </Text>

                                    <TouchableOpacity
                                      style={styles.mapIcon}
                                      onPress={() =>
                                        openGoogleMaps(
                                          center.latitude,
                                          center.longitude,
                                          center.name,
                                        )
                                      }>
                                      <Image
                                        source={locationImg}
                                        style={{
                                          width: 16,
                                          height: 20,
                                          marginRight: 5,
                                          tintColor: 'black',
                                        }}
                                      />
                                    </TouchableOpacity>
                                  </View>
                                ))
                              ) : (
                                <Text style={styles.recommendText}>
                                  No recycling centers found
                                </Text>
                              )}
                            </View>
                          </View>
                        ) : (
                          <Text style={styles.recommendText}>
                            No recommendations found
                          </Text>
                        )}
                      </View>
                    );
                  },
                )
              ) : (
                <Text style={styles.resultText}>No waste detected</Text>
              )}
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default Scanner;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 40,
  },
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 10,
    color: '#222',
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  previewImage: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: 12,
    marginBottom: 15,
    resizeMode: 'cover',
  },
  placeholder: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fafafa',
  },
  placeholderText: {
    color: '#aaa',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  resultBox: {
    marginTop: 20,
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#fff',
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  resultText: {
    fontSize: 14,
    color: '#333',
  },
  wasteBlock: {
    marginVertical: 10,
    backgroundColor: '#fafafa',
    borderRadius: 10,
    padding: 10,
  },
  chip: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginBottom: 6,
  },
  chipText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  recommendBox: {
    marginLeft: 5,
    gap: 3,
  },
  recommendText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  bold: {
    fontWeight: '700',
  },
  errorText: {
    fontSize: 14,
    color: 'red',
  },
});
