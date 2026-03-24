import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SettingsSection() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>General Settings</Text>

      <View style={styles.card}>
        <TouchableOpacity style={styles.settingsRow}>
          <View style={styles.rowLeft}>
            <View style={[styles.iconBox, { backgroundColor: "#EFF6FF" }]}>
              <Ionicons name="person-outline" size={20} color="#2563EB" />
            </View>
            <Text style={styles.rowText}>Personal Information</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
        </TouchableOpacity>

        {/* <View style={styles.settingsRow}>
          <View style={styles.rowLeft}>
            <View style={[styles.iconBox, { backgroundColor: '#F1F5F9' }]}>
              <Ionicons name="moon-outline" size={20} color="#475569" />
            </View>
            <Text style={styles.rowText}>Dark Mode</Text>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={setIsDarkMode}
            trackColor={{ false: '#E2E8F0', true: '#2563EB' }}
            thumbColor={'white'}
          />
        </View> */}

        {/* <TouchableOpacity style={[styles.settingsRow, styles.lastRow]}>
          <View style={styles.rowLeft}>
            <View style={[styles.iconBox, { backgroundColor: "#DCFCE7" }]}>
              <Ionicons name="help-circle-outline" size={20} color="#16A34A" />
            </View>
            <Text style={styles.rowText}>Help & Support</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  settingsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 4,
  },
  lastRow: {
    marginBottom: 0,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  rowText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1E293B",
  },
});
