import { getGradientColors } from "@/helpers/helpers";
import { useGetAccountsAndBalance } from "@/hooks/useGetAccountsAndBalance";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function BalanceHome() {
  const { data: accounts, isPending } = useGetAccountsAndBalance();

  const getAccountColor = (accountType: string, provider: string) => {
    return getGradientColors(accountType, provider)[0];
  };

  if (isPending || accounts?.accounts.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.addAccountsText}>
          Add Accounts from Profile to Show here.
        </Text>
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
      <View style={styles.content}>
        <View style={styles.topSection}>
          <Text style={styles.headerText}>Total Balance for Accounts:</Text>

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
                  {
                    backgroundColor:
                      getAccountColor(
                        account.account_type,
                        account.provider || "",
                      ) + "90", // Kept the subtle transparency
                  },
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
  emptyContainer: {
    height: 140,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 24,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  addAccountsText: {
    fontFamily: "PlayfairDisplay_400Regular",
    color: "#A39B95",
    fontSize: 14,
    textAlign: "center",
  },
  balanceContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 24,
    marginBottom: 8,
  },
  content: {
    padding: 24,
  },
  topSection: {
    justifyContent: "center",
  },
  headerText: {
    fontFamily: "PlayfairDisplay_400Regular",
    color: "#A39B95",
    fontSize: 16,
    marginBottom: 12,
  },
  tagsSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  tagPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontFamily: "PlayfairDisplay_600SemiBold",
    color: "#FFFFFF",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  balanceText: {
    fontFamily: "PlayfairDisplay_600SemiBold",
    color: "#FFFFFF",
    fontSize: 40,
  },
});
