import { clearLocalUser } from "@/service/local/service";
import { Ionicons } from "@expo/vector-icons";
import { CommonActions } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import { Route, useNavigation } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SettingsSection() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const queryClient = useQueryClient();
  const rootNavigation = useNavigation("/");

  const logout = async () => {
    await clearLocalUser();
    queryClient.clear();
    rootNavigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "index" as Route }],
      }),
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Settings</Text>

      <View style={styles.listContainer}>
        <View style={styles.card}>
          <TouchableOpacity style={styles.settingsRow} activeOpacity={0.4}>
            <View style={styles.rowLeft}>
              <View style={styles.iconBox}>
                <Ionicons name="person-outline" size={20} color="#FFFFFF" />
              </View>
              <Text style={styles.rowText}>Personal Information</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#78716C" />
          </TouchableOpacity>
        </View>

        <View style={styles.logoutButtonContainer}>
          <TouchableOpacity
            style={styles.logoutButton}
            activeOpacity={0.4}
            onPress={() => logout()}
          >
            <View style={styles.rowLeft}>
              <Text style={styles.logoutText}>Logout</Text>
            </View>
            <Ionicons name="exit" size={20} color="#FD3C4A" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 28,
  },
  sectionTitle: {
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 24,
    color: "#FFFFFF",
    marginBottom: 16,
  },
  listContainer: {
    flexDirection: "column",
    gap: 24,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  settingsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 80,
    paddingHorizontal: 16,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBox: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  rowText: {
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 18,
    color: "#FFFFFF",
  },
  logoutButtonContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  logoutButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    paddingHorizontal: 16,
  },
  logoutText: {
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 18,
    color: "#FD3C4A",
  },
});
