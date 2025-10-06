import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from "react-native";
import Geolocation from "@react-native-community/geolocation";
import { useNavigation } from "@react-navigation/native";
import Geocoder from 'react-native-geocoding';
import AsyncStorage from "@react-native-async-storage/async-storage";


// Initialize Google Maps Geocoding API
Geocoder.init('AIzaSyA47FXlwil0jkNP-RHVRo78RSH7kil2GT0');

const Pickup = () => {
  const navigation = useNavigation();
  const [address, setAddress] = useState("Fetching current location...");
  const [isEditing, setIsEditing] = useState(false);
  const [tempAddress, setTempAddress] = useState("");
  const [selectedWaste, setSelectedWaste] = useState(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;

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
                    setAddress(shortAddress);
                  }
                })
                .catch(error => console.warn(error));
            },
      (error) => setAddress("Unable to fetch location"),
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
    );
  }, []);

  const wasteTypes = [
    "Organic Waste",
    "Recycleable Products",
    "Large Items",
    "Hazardous Material",
  ];

   const handleSaveAndNavigate = async () => {
    if (!selectedWaste) {
      Alert.alert("Warning", "Please select a waste type first!");
      return;
    }

    try {
      const data = {
        address: address, // always latest (default or changed)
        wasteType: selectedWaste,
      };
      await AsyncStorage.setItem("wastePickupData", JSON.stringify(data));
      console.log("Saved to AsyncStorage:", data);

      navigation.navigate("Dates");
    } catch (error) {
      console.log("Error saving to storage", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Pickup Address */}
      <Text style={styles.title}>Pickup Address</Text>

      {isEditing ? (
        <TextInput
          style={styles.input}
          value={tempAddress}
          onChangeText={setTempAddress}
          placeholder="Enter new address"
        />
      ) : (
        <TextInput
          style={[styles.input, { color: "#888" }]}
          editable={false}
          value={address}
        />
      )}

      <TouchableOpacity
        style={styles.greenBtn}
        onPress={() => {
          if (isEditing && tempAddress) setAddress(tempAddress);
          setIsEditing(!isEditing);
        }}
      >
        <Text style={styles.btnText}>
          {isEditing ? "Save Address" : "Change Address"}
        </Text>
      </TouchableOpacity>

      {/* Waste Type */}
      <Text style={styles.subtitle}>Waste Type</Text>
      {wasteTypes.map((waste, idx) => (
        <TouchableOpacity
          key={idx}
          style={[
            styles.option,
            selectedWaste === waste && styles.selectedOption,
          ]}
          onPress={() => setSelectedWaste(waste)}
        >
          <Text style={styles.optionText}>{waste}</Text>
        </TouchableOpacity>
      ))}

      {/* Select Date & Time Button */}
      <TouchableOpacity
        style={[styles.greenBtn, { marginTop: 20 }]}
        onPress={handleSaveAndNavigate}
      >
        <Text style={styles.btnText}>Select Date & Time</Text>
      </TouchableOpacity>

      <Text style={styles.note}>
        Charges will be applied according to pickup location
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff", flex: 1 },
  title: { fontSize: 24, fontWeight: "600", marginBottom: 8, color: "#222" },
  subtitle: { fontSize: 24, fontWeight: "600", marginVertical: 12, color:"#222" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    fontSize: 14,
  },
  greenBtn: {
    backgroundColor: "#2e7d32",
    padding: 18,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "600", fontSize: 18 },
  option: {
    backgroundColor: "#ccc",
    padding: 14,
    borderRadius: 6,
    marginBottom: 10,
  },
  selectedOption: { backgroundColor: "#2e7d32" },
  optionText: { color: "#000", fontWeight: "500" },
  note: { fontSize: 12, color: "#777", marginTop: 20, textAlign: "center" },
});


export default Pickup;
