import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { categoryData } from "../../../Assets/constant/categoryData"; // 👈 import constants

export default function ReuseCategoryDetail({ route }) {
  const { category } = route.params;
  const data = categoryData[category];

  return (
    <View style={styles.container}>
      <Image source={data.image} style={styles.image} resizeMode="cover" />
      <Text style={styles.title}>{category}</Text>
      <Text style={styles.desc}>{data.description}</Text>

      <Text style={styles.subtitle}>Examples:</Text>
      <FlatList
        data={data.examples}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.exampleBox}>
            <Text style={styles.exampleName}>{item.name}</Text>
            <Text style={styles.exampleDesc}>{item.desc}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  image: { width:'80%', height: 180, alignSelf: "center", marginBottom: 15 },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 10, color:'black' },
  desc: { fontSize: 16, textAlign: "center", marginBottom: 20, color:'black' },
  subtitle: { fontSize: 18, fontWeight: "600", marginBottom: 10,color:'black' },
  exampleBox: {
    padding: 10,
    backgroundColor: "#f5f5f5",
    marginBottom: 10,
    borderRadius: 8,
  },
  exampleName: { fontWeight: "bold", fontSize: 16, marginBottom: 3, color:'black' },
  exampleDesc: { fontSize: 14, color:'black' },
});
