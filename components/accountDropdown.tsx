import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ACCOUNTS = [
  "Checking Account (**** 1234)",
  "Savings Account (**** 5678)",
  "Cash Wallet",
];

export default function AccountDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(ACCOUNTS[0]);

  return (
    <View style={styles.dropdownZIndexWrapper}>
      <View style={styles.dropdownAnchor}>
        <TouchableOpacity
          style={styles.dropdownTrigger}
          activeOpacity={0.7}
          onPress={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <Text style={styles.dropdownText}>{selectedAccount}</Text>
          <Ionicons
            name={isDropdownOpen ? "chevron-up" : "chevron-down"}
            size={20}
            color="#64748B"
          />
        </TouchableOpacity>

        {isDropdownOpen && (
          <ScrollView style={styles.absoluteDropdownList}>
            <FlatList
              data={ACCOUNTS}
              keyExtractor={(item) => item}
              scrollEnabled={false}
              renderItem={({ item, index }) => {
                const isSelected = selectedAccount === item;
                return (
                  <TouchableOpacity
                    style={[
                      styles.dropdownItem,
                      index === ACCOUNTS.length - 1 && styles.lastDropdownItem,
                    ]}
                    onPress={() => {
                      setSelectedAccount(item);
                      setIsDropdownOpen(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        isSelected && styles.dropdownItemTextActive,
                      ]}
                    >
                      {item}
                    </Text>
                    {isSelected && (
                      <Ionicons name="checkmark" size={18} color="#2563EB" />
                    )}
                  </TouchableOpacity>
                );
              }}
            />
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownZIndexWrapper: {
    ...(Platform.OS === "ios"
      ? { zIndex: 1000 }
      : { elevation: 1000, zIndex: 1000 }),
  },
  dropdownAnchor: {
    position: "relative",
    zIndex: 1000,
  },
  absoluteDropdownList: {
    position: "absolute",
    top: 54,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingVertical: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
    zIndex: 1000,
  },
  dropdownTrigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
  },
  dropdownText: {
    fontSize: 15,
    color: "#1E293B",
  },
  dropdownItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  lastDropdownItem: {
    borderBottomWidth: 0,
  },
  dropdownItemText: {
    fontSize: 15,
    color: "#475569",
  },
  dropdownItemTextActive: {
    color: "#2563EB",
    fontWeight: "600",
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 8,
    marginTop: 16,
  },
});
