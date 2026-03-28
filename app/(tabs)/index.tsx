import BalanceHome from "@/components/balanceHome";
import BudgetGoalContainer from "@/components/budgetGoalsContainer";
import HomeGreeting from "@/components/homeGreeting";
import TransactionList from "@/components/transactionList";
import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
        <View style={[styles.screenContainer]}>
          <HomeGreeting name={"Aeron Caponpon"} />
          <BalanceHome />
          <BudgetGoalContainer />

          <View style={styles.transactionContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Recent Transactions</Text>
              <Text
                onPress={() => {
                  router.push("/(tabs)/history");
                }}
              >
                See more
              </Text>
            </View>
            <TransactionList />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "slate",
    padding: 24,
  },
  transactionContainer: {
    flex: 1,
    paddingBottom: 100,
  },
  headerContainer: {
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  transactionsContainer: {
    gap: 12,
  },
});
