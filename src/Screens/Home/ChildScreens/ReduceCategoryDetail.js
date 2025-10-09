// screens/CategoryScreen.js
import React from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import { categoryProjects } from "../../../Assets/constant/categoryProjects";

export default function ReduceCategoryDetail({ route }) {
  const { categoryName } = route.params;
  const projects = categoryProjects[categoryName] || [];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{categoryName} Projects</Text>

      {projects.length === 0 ? (
        <Text style={styles.emptyText}>No projects found for this category.</Text>
      ) : (
        <FlatList
          data={projects}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.details}>{item.details}</Text>

                <View style={styles.tag}>
                  <Text style={styles.tagText}>{item.difficulty}</Text>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: { fontSize: 22, fontWeight: "bold", color: "#2E7D32", marginBottom: 12 },
  emptyText: { textAlign: "center", color: "#000000ff", marginTop: 40 },
  card: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 12,
    marginVertical: 8,
    alignItems: "center",
  },
  image: { width: 60, height: 60, borderRadius: 10, marginRight: 12 },
  textContainer: { flex: 1 },
  details: { fontSize: 14, color: "#010101ff", marginTop: 4 },

  title: { fontSize: 18, fontWeight: "bold", color:'black' },
  description: { fontSize: 16, color: "#000000ff", marginVertical: 4 },
  tag: {
    alignSelf: "flex-start",
    backgroundColor: "#C8E6C9",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: { color: "#2E7D32", fontWeight: "600", fontSize: 12 },
});
