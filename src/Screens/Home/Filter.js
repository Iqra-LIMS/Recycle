import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import axios from "axios";

const API_KEY = "AIzaSyA47FXlwil0jkNP-RHVRo78RSH7kil2GT0"; // replace with your YouTube API Key

const Filter = () => {
  const [search, setSearch] = useState("");
  const [suggestions] = useState(["Recycle", "Reuse", "Reduce"]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch videos function
  const fetchVideos = async (query) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search`,
        {
          params: {
            part: "snippet",
            q: query,
            maxResults: 8,
            type: "video",
            key: API_KEY,
          },
        }
      );
      const items = response.data.items.map((item) => ({
        id: item.id.videoId,
        title: item.snippet.title,
      }));
      setVideos(items);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Load default suggestion ("Recycle") but keep search input clear
  useEffect(() => {
    fetchVideos("Recycle");
    setSearch(""); // clear input
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* 🔹 Fixed Header (search + suggestions) */}
      <View style={styles.headerWrapper}>
        <Text style={styles.header}>♻️ Learn to Recycle, Reuse, Reduce</Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBox}
            placeholder="Search eco-friendly videos..."
            placeholderTextColor="#888"
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={() => fetchVideos(search)}
          />
          <TouchableOpacity
            style={styles.searchBtn}
            onPress={() => fetchVideos(search)}
          >
            <Text style={styles.searchBtnText}>Go</Text>
          </TouchableOpacity>
        </View>

        {/* Suggestions */}
        <View style={styles.suggestions}>
          {suggestions.map((sug, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.suggestionBtn,
                search === sug && styles.activeSuggestion,
              ]}
              onPress={() => {
                setSearch(""); // clear search input
                fetchVideos(sug);
              }}
            >
              <Text
                style={[
                  styles.suggestionText,
                  search === sug && styles.activeSuggestionText,
                ]}
              >
                {sug}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 🔹 Loader while fetching */}
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#2d6a4f" />
          <Text style={{ color: "#2d6a4f", marginTop: 8 }}>Loading videos...</Text>
        </View>
      ) : (
        /* 🔹 Video List */
        <FlatList
          data={videos}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          renderItem={({ item }) => (
            <View style={styles.videoCard}>
              <Text style={styles.videoTitle}>{item.title}</Text>
              <View style={styles.videoContainer}>
                <YoutubePlayer height={220} play={false} videoId={item.id} />
              </View>
            </View>
          )}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F9F6",
  },
  headerWrapper: {
    backgroundColor: "#F5F9F6",
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2d6a4f",
    textAlign: "center",
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
  },
  searchBox: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    paddingVertical: 6,
  },
  searchBtn: {
    backgroundColor: "#2d6a4f",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginLeft: 8,
  },
  searchBtnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  suggestions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 5,
  },
  suggestionBtn: {
    backgroundColor: "#95d5b2",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  activeSuggestion: {
    backgroundColor: "#2d6a4f",
  },
  suggestionText: {
    color: "#1b4332",
    fontSize: 14,
    fontWeight: "600",
  },
  activeSuggestionText: {
    color: "#fff",
  },
  videoCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  videoContainer: {
    height: 220,
    borderRadius: 12,
    overflow: "hidden",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
