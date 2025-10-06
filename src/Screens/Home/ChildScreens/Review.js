import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {db} from '../../Auth_Screen/firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";


const Review = () => {
  const [pickupData, setPickupData] = useState(null);
  const [dateData, setDateData] = useState(null);
  const [cost, setCost] = useState(80); // starting cost
    const navigation = useNavigation();
  

  useEffect(() => {
    const loadData = async () => {
      try {
        const wastePickup = await AsyncStorage.getItem('wastePickupData');
        const dateInfo = await AsyncStorage.getItem('DateData');

        if (wastePickup) setPickupData(JSON.parse(wastePickup));
        if (dateInfo) setDateData(JSON.parse(dateInfo));
      } catch (error) {
        console.log('Error loading data:', error);
      }
    };
    loadData();
  }, []);

 const handleConfirmPickup = async () => {
    try {
      if (!pickupData || !dateData) {
        Alert.alert("Error", "Missing pickup data!");
        return;
      }

      // Create a record in Firestore
      const docRef = await addDoc(collection(db, "Pickups"), {
        date: dateData.date,
        time: dateData.slot,
        address: pickupData.address,
        items: pickupData.wasteType,
        cost: cost,
        createdAt: serverTimestamp(),
      });

      console.log("Document written with ID: ", docRef.id);

      // Navigate to success screen and pass data
      navigation.navigate("Sucessfull", {
        confirmationId: docRef.id,
        date: dateData.date,
        time: dateData.slot,
      });
    } catch (error) {
      console.error("Error saving data: ", error);
      Alert.alert("Error", "Failed to save pickup data!");
    }
  };


  if (!pickupData || !dateData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading pickup summary...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Pickup Summary</Text>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{dateData.date || 'N/A'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Time:</Text>
          <Text style={styles.value}>{dateData.slot || 'N/A'}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>{pickupData.address || 'N/A'}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Items:</Text>
          <Text style={styles.value}>{pickupData.wasteType || 'N/A'}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Cost:</Text>
          <View style={styles.costWrapper}>
            <TextInput
              style={styles.costInput}
              value={cost}
              keyboardType="numeric"
              placeholder="80"
              onChangeText={setCost}
            />
            <Text style={styles.rsText}>Rs</Text>
          </View>
        </View>
      </View>

      <Text style={styles.reminderTitle}>Reminders</Text>
      <View style={styles.reminderList}>
        <Text style={styles.bullet}>• Place items outside by 8:00 AM</Text>
        <Text style={styles.bullet}>• Clean containers before pickup</Text>
        <Text style={styles.bullet}>• SMS will be sent</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleConfirmPickup}>
        <Text style={styles.buttonText}>Confirm Pickup</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Review;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f7f7f7',
    paddingVertical: 20,
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
    padding: 10,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#121212ff',
  },
  value: {
    fontSize: 16,
    color: '#444',
  },
  reminderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    color: 'black',
  },
  reminderList: {
    marginBottom: 20,
  },
  bullet: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#2d8a43',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  costWrapper: {
  flexDirection: 'row',
  alignItems: 'center',
},
  costInput: {
  fontSize: 16,
  paddingHorizontal: 5,
  minWidth: 60,
  textAlign: 'center',
  color: '#444',
},
rsText: {
  fontSize: 16,
  marginLeft: 5, // small gap only
  color: '#444',
},
});
