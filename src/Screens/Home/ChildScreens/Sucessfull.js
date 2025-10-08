import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";


const Sucessfull = ({ route }) => {
        const navigation = useNavigation();
    
  const { confirmationId, date, time } = route.params || {};

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Text style={styles.check}>✓</Text>
      </View>

      <Text style={styles.title}>Pickup Scheduled!</Text>
      <Text style={styles.subText}>Confirmation #: {confirmationId}</Text>

      <TouchableOpacity style={styles.statusBox} onPress={() => navigation.navigate("Main")}>
        <Text style={styles.statusText}>Scheduled</Text>
      </TouchableOpacity>

      <Text style={styles.dateText}>{date}</Text>
      <Text style={styles.timeText}>{time}</Text>


    </View>
  );
};

export default Sucessfull;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    
  },
  circle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "#2d8a43",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop:45,
  },
  check: {
    fontSize: 45,
    color: "#2d8a43",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    color:"black"
  },
  subText: {
    fontSize: 16,
    color: "#888",
    marginBottom: 35,
  },
  statusBox: {
    backgroundColor: "#e2e2e2",
    padding: 16,
    width:"80%",
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
    elevation: 3,
    marginBottom: 20,

  },
  statusText: {
    fontSize: 20,
    fontWeight: "bold",
    color:'black'
  },
  dateText: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    color:'black'
  },
  timeText: {
    fontSize: 16,
    color: "#555",
  },
});
