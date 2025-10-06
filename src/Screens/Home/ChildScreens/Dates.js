import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Dates = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [instruction, setInstruction] = useState("");
  const [number, setNumber] = useState("");

  const navigation = useNavigation();

  const today = moment().format("YYYY-MM-DD");
  const currentHour = moment().hour();

  const slots = [
    { id: 1, label: "08:00 AM - 10:00 AM", start: 8, end: 10 },
    { id: 2, label: "10:00 AM - 12:00 PM", start: 10, end: 12 },
    { id: 3, label: "04:00 PM - 06:00 PM", start: 16, end: 18 },
  ];

  const weekdayMessages = {
    Monday: "Fresh start of the week 🌸",
    Tuesday: "Keep going, you're doing great! 💪",
    Wednesday: "Halfway there, stay strong! 🚀",
    Thursday: "Almost Friday, keep shining ✨",
    Friday: "Weekend vibes are near 🎉",
  };

  const disableDay = (day) => {
    const date = moment(day.dateString);
    const isPast = date.isBefore(moment(), "day");
    const isWeekend = date.day() === 0 || date.day() === 6;
    return isPast || isWeekend;
  };

  const buildMarkedDates = () => {
    let marks = {};
    if (selectedDate) {
      marks[selectedDate] = {
        selected: true,
        marked: true,
        selectedColor: "#2e7d32",
      };
    }
    const start = moment().subtract(1, "month");
    const end = moment().add(2, "month");
    for (let m = start.clone(); m.isBefore(end); m.add(1, "day")) {
      if (m.isBefore(moment(), "day") || m.day() === 0 || m.day() === 6) {
        marks[m.format("YYYY-MM-DD")] = { disabled: true, textColor: "red" };
      }
    }
    return marks;
  };

  const renderSlots = () => {
    if (!selectedDate) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Available Slots</Text>
        <View style={styles.slotRow}>
          {slots.map((slot) => {
            let disabled = false;
            if (selectedDate === today) {
              if (currentHour >= slot.end) disabled = true;
            }
            return (
              <TouchableOpacity
                key={slot.id}
                style={[
                  styles.slot,
                  selectedSlot === slot.id && styles.selectedSlot,
                  disabled && styles.disabledSlot,
                ]}
                disabled={disabled}
                onPress={() => setSelectedSlot(slot.id)}
              >
                <Text
                  style={[
                    styles.slotText,
                    disabled && { color: "#999" },
                    selectedSlot === slot.id && { color: "#fff" },
                  ]}
                >
                  {slot.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  const handleSaveAndNavigate = async () => {
    if (!selectedDate) {
      Alert.alert("Warning", "Please select a Date first!");
      return;
    }
    if (!selectedSlot) {
      Alert.alert("Warning", "Please select a slot first!");
      return;
    }
    if (!number) {
      Alert.alert("Warning", "Please enter a phone number!");
      return;
    }

    try {
      const chosenSlot = slots.find(slot => slot.id === selectedSlot);

      const data = {
        date: selectedDate,
        slot: chosenSlot ? chosenSlot.label : null, 
        number: number,
        instruction: instruction,
      };
      await AsyncStorage.setItem("DateData", JSON.stringify(data));
      console.log("Saved to AsyncStorage:", data);

      navigation.navigate("Review");
    } catch (error) {
      console.log("Error saving to storage", error);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <Calendar
        minDate={today}
        onDayPress={(day) => {
          if (!disableDay(day)) {
            setSelectedDate(day.dateString);
            setSelectedSlot(null);
          } else {
            Alert.alert(
              "Not Allowed",
              "Past dates and weekends are unavailable."
            );
          }
        }}
        markedDates={buildMarkedDates()}
        theme={{
          todayTextColor: "#2e7d32",
          arrowColor: "black",
          textDayFontWeight: "500",
          textMonthFontWeight: "bold",
          textDayHeaderFontWeight: "600",
        }}
      />

      {selectedDate && (
        <View style={styles.selectedInfo}>
          <Text style={styles.selectedText}>
            {moment(selectedDate).format("MMMM DD, YYYY")}
          </Text>
          <Text style={styles.dayText}>
            {moment(selectedDate).format("dddd")} -{" "}
            {weekdayMessages[moment(selectedDate).format("dddd")] ||
              "Enjoy your day! 🌟"}
          </Text>
        </View>
      )}

      {renderSlots()}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Special Instructions</Text>
        <TextInput
          placeholder="Items location, access notes..."
          style={styles.input}
          value={instruction}
          onChangeText={setInstruction}
          multiline
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          placeholder="+92 317 1579559"
          style={styles.input}
          keyboardType="phone-pad"
          value={number}
          onChangeText={setNumber}
        />
      </View>

      <TouchableOpacity style={styles.greenBtn} onPress={handleSaveAndNavigate}>
        <Text style={styles.btnText}>Review Pickup</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    padding: 15,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2e7d32",
    marginBottom: 15,
    textAlign: "center",
  },
  selectedInfo: {
    marginVertical: 12,
    alignItems: "center",
  },
  selectedText: {
    fontSize: 18,
    fontWeight: "700",
    color: "black",
  },
  dayText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#555",
    marginTop: 5,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "black",
  },
  slotRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  slot: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 5,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    elevation: 2,
  },
  selectedSlot: {
    backgroundColor: "#2e7d32",
  },
  disabledSlot: {
    backgroundColor: "#f0f0f0",
  },
  slotText: {
    fontSize: 13,
    fontWeight: "600",
    color: "black",
    textAlign: "center",
  },
  instructionLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
    color: "black",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    backgroundColor: "#fff",
  },
  greenBtn: {
    backgroundColor: "#2e7d32",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
    elevation: 3,
  },
  btnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
  label:{
    color:"black",
  }
});

export default Dates;
