import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type CashflowCardProps = {
  type: "Income" | "Expense";
  percent: string;
  color: string;
};

export default function CashflowCard({ type, percent, color }: CashflowCardProps) {
  const isIncome = type === "Income";

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <View style={styles.iconCircle}>
        <Ionicons
          name={isIncome ? "trending-up" : "trending-down"}
          size={22}
          color="white"
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.typeText}>{type}</Text>
        <Text style={styles.percentText}>{percent}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 120,
    borderRadius: 32,
    padding: 20,
    justifyContent: "space-between",

  },
  iconCircle: {
    width: 42,
    height: 28,
    borderRadius: 21,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    marginTop: 4,
  },
  typeText: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 14,
    fontWeight: "500",
  },
  percentText: {
    color: "white",
    fontSize: 24,
    fontWeight: "800",
  },
});