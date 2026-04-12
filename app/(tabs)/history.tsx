import TransactionList from "@/components/transactionList";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function History() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <View style={styles.mainBackground}>
      <SafeAreaView edges={["top"]} style={styles.headerCard}>
        <Text style={styles.headerTitle}>Transaction History</Text>

        <View style={styles.searchRow}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={24} color="#7871 w6C" />
            <TextInput
              placeholder="Search transactions..."
              placeholderTextColor="#78716C"
              style={styles.searchInput}
              selectionColor="#FFFFFF"
              onChangeText={setSearchQuery}
            />
          </View>

          {/* <TouchableOpacity style={styles.filterButton} activeOpacity={0.9}>
            <Ionicons name="funnel-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity> */}
        </View>
      </SafeAreaView>

      <ScrollView
        style={styles.listContainer}
        showsVerticalScrollIndicator={false}
      >
        <TransactionList limits="none" searchQuery={searchQuery} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainBackground: {
    flex: 1,
    backgroundColor: "#232323",
  },
  headerCard: {
    backgroundColor: "#1C1816",
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 24,
  },
  headerTitle: {
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 32,
    color: "#FFFFFF",
    marginBottom: 24,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    height: 60,
    paddingHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 18,
    color: "#FFFFFF",
  },
  filterButton: {
    width: 60,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});
