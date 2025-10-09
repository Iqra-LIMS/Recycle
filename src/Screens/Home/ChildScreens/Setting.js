import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  SafeAreaView,
  ScrollView,
} from "react-native";

const Setting = () => {
  const [language] = useState("English");
  const [region] = useState("Pakistan");

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
    

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16 }}
      >
        {/* About Phone */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>About Phone</Text>
          </View>
          <Text style={styles.itemText}>
            Device: {Platform.OS === "android" ? "Android" : "iOS"}
          </Text>
          <Text style={styles.itemText}>OS Version: {Platform.Version}</Text>
          <Text style={styles.itemText}>App Version: 1.0.0</Text>
        </View>

        {/* Language & Region */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Language & Region</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Language</Text>
            <Text style={styles.value}>{language}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Region</Text>
            <Text style={styles.value}>{region}</Text>
          </View>
        </View>

        {/* App Info */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>App Information</Text>
          </View>
          <Text style={styles.itemText}>Developed by: AgriTech Team 🌱</Text>
          <Text style={styles.itemText}>Contact: info@agritech.com</Text>
          <Text style={styles.itemText}>Last Updated: Oct 2025</Text>
        </View>

        {/* Footer */}
        <Text style={styles.footerText}>© 2025 GreenRecycle. All Rights Reserved.</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#000000ff",
    marginLeft: 8,
  },
  itemText: {
    fontSize: 15,
    color: "#000000ff",
    marginBottom: 6,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  label: {
    fontSize: 15,
    color: "#000000ff",
  },
  value: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1b873f",
  },
  footerText: {
    textAlign: "center",
    fontSize: 12,
    color: "#000000ff",
    marginTop: 10,
    marginBottom: 20,
  },
});
