import { useGetAccountsAndBalance } from "@/hooks/useGetAccountsAndBalance";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function BalanceHome() {
  const {data: accounts, isPending} = useGetAccountsAndBalance();

  if (isPending || accounts?.accounts.length === 0) {
    return (
      <View style={styles.balanceContainer}>
        <LinearGradient
          colors={["#2B60E9", "#1A3A8A"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.background}
        />
        <View style={{ ...StyleSheet.absoluteFillObject, justifyContent: "center", alignItems: "center"}}>
          <View style={{ justifyContent: "center", alignItems: "center"}}>
            <Text style={styles.addAccountsText}>Add Accounts from Profile to Show here.</Text>
          </View>
        </View>
      </View>
    );
  }

  const shortenAccountName = (name: string) => {
    return name.length > 12 ? name.slice(0, 10) + "..." : name;
  };

  const getAndFormatBalance = () => {
    const balance: number = accounts?.total_balance || 0; 

    return balance.toLocaleString("en-US", {
      style: "currency",
      currency: "PHP",
    });
  };

  const balance = getAndFormatBalance();

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
            <Text style={styles.headerText}>Total Balance for Accounts:</Text>
          </View>
            <ScrollView
              horizontal={true} 
              showsHorizontalScrollIndicator={false}
              style={{ flexGrow: 0 }} 
              contentContainerStyle={styles.tagsSection}
            >
              {accounts?.accounts.map((account, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.tagPill,
                    { backgroundColor: account.color + "90" },
                  ]}
                >
                  <Text style={styles.tagText}>
                    {shortenAccountName(account.name)}
                  </Text>
                </View>
              ))}
            </ScrollView>
          <Text style={styles.balanceText}>{balance}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  balanceContainer: {
    height: 132,
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
  },
  topSection: {
    marginTop: 0,
    marginBottom: 12,
  },
  headerText: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 16,
    fontWeight: "500",
    marginTop: -8,
  },
  runningText: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 14,
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
    fontSize: 38,
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
  addAccountsText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
  }
});
