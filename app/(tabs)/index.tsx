import BalanceHome from "@/components/balanceHome";
import BudgetGoalContainer from "@/components/budgetGoalsContainer";
import HomeGreeting from "@/components/homeGreeting";
import TransactionList from "@/components/transactionList";
import { useGetUser } from "@/hooks/useGetUser";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { user, isLoading } = useGetUser();
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user && user.name) {
      setUserName(user.name);
    }
  }, [user, isLoading]);

  if (isLoading) {
    return null;
  }

  if (!user) {
    router.replace("/");
    return null;
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
        <View style={[styles.screenContainer]}>
          <HomeGreeting name={userName} />
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
            <TransactionList limits="5" />
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
