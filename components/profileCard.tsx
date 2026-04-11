import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  name: string;
}

export default function ProfileCard({ name }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        <View
          style={{
            width: 64,
            height: 64,
            borderRadius: 32,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          }}
        />
        <Text style={styles.name}>{name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: 20,
    alignItems: "center",
    marginBottom: 24,
  },
  infoContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 16,
  },
  name: {
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 24,
    color: "#FFFFFF",
  },
});
