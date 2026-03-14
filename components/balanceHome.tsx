import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";

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
        <Text style={styles.headerText}>Remaining Balance</Text>
        <Text style={styles.balanceText}>200</Text>
        {/* TODO: Add the current account since i plan to set the remaining balance of  a specific account only, 
        can be multiple and just add the totals, and use tag for the Accounts used, also add income/transfer
        also will combine the totals */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  balanceContainer: {
    height: 200,
    borderRadius: 24,
    overflow: "hidden",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    padding: 24,
  },
  headerText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 16,
    fontWeight: "300",
    letterSpacing: 0.5,
  },
  balanceText: {
    color: "white",
    fontWeight: "800",
    fontSize: 48,
    marginTop: 4,
  },
});
