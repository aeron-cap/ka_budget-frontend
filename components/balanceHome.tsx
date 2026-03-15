import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";

const tags = ["Maribank", "GoTyme"];

type BalanceHomeProps = {
  accounts: string[];
  income: string;
  expense: string;
  totalBalance: string;
};

export default function BalanceHome() {
  return (
    <View style={styles.balanceContainer}>
      <LinearGradient
        colors={["#2B60E9", "#1A3A8A"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.background}
      />
      <View style={styles.content}>
        <View style={styles.topSection}>
          <View style={styles.headerRow}>
            <Text style={styles.headerText}>Total Balance</Text>

            <View style={styles.tagsSection}>
              {tags.slice(0, 3).map((tag, idx) => (
                <View key={idx} style={styles.tagPill}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>

          <Text style={styles.balanceText}>24,500.50</Text>
        </View>

        <View style={styles.movementContainer}>
          <View style={styles.movement}>
            <View
              style={[
                styles.iconCircle,
                { backgroundColor: "rgba(255, 255, 255, 0.15)" },
              ]}
            >
              <Ionicons name="arrow-down-outline" size={16} color="#4ADE80" />
            </View>
            <View style={styles.movementTextGroup}>
              <Text style={styles.movementLabel}>Income</Text>
              <Text style={styles.movementValue}>8,200</Text>
            </View>
          </View>

          <View style={styles.movement}>
            <View
              style={[
                styles.iconCircle,
                { backgroundColor: "rgba(255, 255, 255, 0.15)" },
              ]}
            >
              <Ionicons name="arrow-up-outline" size={16} color="#F87171" />
            </View>
            <View style={styles.movementTextGroup}>
              <Text style={styles.movementLabel}>Expense</Text>
              <Text style={styles.movementValue}>3,450.75</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  balanceContainer: {
    height: 220,
    borderRadius: 28,
    overflow: "hidden",
    marginBottom: 8,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "space-between",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: -8,
  },
  topSection: {
    marginTop: 0,
  },
  headerText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 16,
    fontWeight: "500",
    marginTop: -8,
  },
  tagsSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 4,
    marginBottom: 10,
  },
  tagPill: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  tagText: {
    color: "white",
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  balanceText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 48,
    marginTop: -8,
  },
  movementContainer: {
    flexDirection: "row",
    gap: 12,
  },
  movement: {
    flex: 1,
    flexDirection: "row",
    height: 70,
    borderRadius: 20,
    paddingHorizontal: 12,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  movementTextGroup: {
    flexDirection: "column",
  },
  movementLabel: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 12,
    fontWeight: "500",
  },
  movementValue: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
});
