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
    <View style={[styles.row, styleType === "Transfer" ? { height: 86 } : {}]}>
      <TouchableOpacity
        style={styles.dateCard}
        activeOpacity={0.7}
        onPress={togglePicker}
      >
        <Text style={styles.dateText}>{formattedDate}</Text>
        <Ionicons name="calendar" size={18} color="#94A3B8" />
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={displayDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onChange}
        />
      )}

      {/*<TouchableOpacity style={styles.fileCard} activeOpacity={0.7}>*/}
      {/*  <Ionicons name="attach" size={24} color="#64748B" />*/}
      {/*  <Text style={styles.fileText}>Add file</Text>*/}
      {/*</TouchableOpacity>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
  dateCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  dateText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "700",
    color: "#1E293B",
    marginLeft: 12,
  },
  fileCard: {
    width: 80,
    backgroundColor: "white",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  fileText: {
    fontSize: 11,
    color: "#64748B",
    fontWeight: "500",
    marginTop: 4,
  },
});
