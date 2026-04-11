import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type DateAndFileInputProps = {
  selectedDate: Date;
  onSelect: (value: Date) => void;
  styleType: string;
};

export default function DateAndFileInputs({
  selectedDate,
  onSelect,
  styleType,
}: DateAndFileInputProps) {
  const [showPicker, setShowPicker] = useState(false);
  const displayDate = selectedDate || new Date();

  const formattedDate = `${String(displayDate.getMonth() + 1).padStart(2, "0")} / ${String(
    displayDate.getDate(),
  ).padStart(2, "0")} / ${displayDate.getFullYear()}`;

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = (event: DateTimePickerEvent, date?: Date) => {
    if (Platform.OS === "android") {
      setShowPicker(false);
    }
    if (event.type === "set" && date) {
      onSelect(date);
    } else if (event.type === "dismissed" && Platform.OS === "ios") {
      setShowPicker(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dateCard}
        activeOpacity={0.9}
        onPress={togglePicker}
      >
        <Text style={styles.dateText}>{formattedDate}</Text>
        <Ionicons name="calendar" size={20} color="#78716C" />
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={displayDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  dateCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    paddingHorizontal: 16,
    height: 60,
  },
  dateText: {
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 18,
    color: "#FFFFFF",
  },
});
