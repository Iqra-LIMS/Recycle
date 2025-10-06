import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking } from "react-native";

const TutorialCard = ({ title, description, difficulty, youtubeUrl, image }) => {
  const handlePress = () => {
    Linking.openURL(youtubeUrl); // Redirect to YouTube
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image source={image} style={styles.image} /> 
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{difficulty}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0E0E0",
    borderRadius: 12,
    padding: 12,
    marginVertical: 6,
  },
 image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  description: {
    fontSize: 12,
    color: "#555",
    marginVertical: 4,
  },
  badge: {
    backgroundColor: "#9CCC9C",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#2F4F2F",
  },
});

export default TutorialCard;
