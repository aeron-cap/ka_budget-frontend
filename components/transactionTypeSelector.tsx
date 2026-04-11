import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type TransactionType = "Expense" | "Income" | "Transfer";

interface Props {
  selectedType: TransactionType;
  onSelect: (type: TransactionType) => void;
  activeColor: string;
}

export default function TransactionTypeSelector({
  selectedType,
  onSelect,
  activeColor,
}: Props) {
  const types: TransactionType[] = ["Expense", "Income", "Transfer"];

  return (
    <View style={styles.container}>
      {types.map((type) => {
        const isActive = selectedType === type;
        return (
          <TouchableOpacity
            key={type}
            activeOpacity={0.9}
            onPress={() => onSelect(type)}
            style={[
              styles.button,
              isActive
                ? { backgroundColor: activeColor }
                : styles.inactiveButton,
            ]}
          >
            <Text
              style={[
                styles.text,
                isActive
                  ? { color: activeColor === "#FFFFFF" ? "#1C1816" : "#FFFFFF" }
                  : styles.inactiveText,
              ]}
            >
              {type}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    height: 60,
    marginHorizontal: 16,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inactiveButton: {
    backgroundColor: "transparent",
  },
  text: {
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 16,
  },
  inactiveText: {
    color: "#78716C",
  },
});
