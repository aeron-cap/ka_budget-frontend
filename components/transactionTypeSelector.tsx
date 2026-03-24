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
                isActive ? styles.activeText : styles.inactiveText,
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
    backgroundColor: "white",
    padding: 6,
    borderRadius: 24,
    marginHorizontal: 24,
    marginTop: -32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
    zIndex: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 18,
    alignItems: "center",
  },
  inactiveButton: {
    backgroundColor: "transparent",
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
  },
  activeText: {
    color: "white",
  },
  inactiveText: {
    color: "#64748B",
  },
});
