import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from "react-native";

const QuickAction = () => {
  const [ecoTip] = useState("Turn off lights when not in use to save energy 🌍");

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>


      {/* Sort Waste */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Sort Your Waste</Text>
        <Text style={styles.cardText}>
          Separate metal, paper, plastic, and organic waste before disposal. It makes recycling easier ♻️
        </Text>
      </View>

      {/* Eco Tip */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Eco Tip of the Day</Text>
        <Text style={styles.cardText}>{ecoTip}</Text>
      </View>

      {/* Progress */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>This Week's Impact</Text>
        <Text style={styles.cardText}>
          🌿 You helped recycle 3 plastic bottles, 2 cardboard boxes, and 1 tin can!
        </Text>
      </View>

      {/* Reminders */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Reminder</Text>
        <Text style={styles.cardText}>
          🕒 Set a reminder every Sunday to drop recyclables at your local center.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },

  card: {
    backgroundColor: "#f3f3f3",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000ff",
    marginTop: 8,
  },
  cardText: {
    fontSize: 14,
    color: "#000000ff",
    marginTop: 4,
  },

});

export default QuickAction;
