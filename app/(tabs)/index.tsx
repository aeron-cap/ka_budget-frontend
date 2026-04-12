import BalanceHome from "@/components/balanceHome";
import BudgetGoalContainer from "@/components/budgetGoalsContainer";
import HomeGreeting from "@/components/homeGreeting";
import TransactionList from "@/components/transactionList";
import { useGetUser } from "@/hooks/useGetUser";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { data: user, isPending } = useGetUser();
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!isPending && user && user.name) {
      setUserName(user.name);
    }
  }, [user, isPending]);

  if (isPending) {
    return null;
  }

  if (!user) {
    router.replace("/");
    return null;
  }

  return (
    <View style={styles.mainBackground}>
      <SafeAreaView edges={["top"]} style={styles.headerCard}>
        <HomeGreeting name={userName} />
        <BalanceHome />
      </SafeAreaView>

      <ScrollView
        style={styles.listContainer}
        showsVerticalScrollIndicator={false}
      >
        <BudgetGoalContainer />

        <View style={styles.transactionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                router.push("/(tabs)/history");
              }}
            >
              <Text style={styles.seeMoreText}>See more</Text>
            </TouchableOpacity>
          </View>
          <TransactionList limits="5" />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainBackground: {
    flex: 1,
    backgroundColor: "#232323",
  },
  headerCard: {
    backgroundColor: "#1C1816",
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 24,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  transactionContainer: {
    flex: 1,
    paddingBottom: 100,
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 24,
    color: "#FFFFFF",
  },
  seeMoreText: {
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 14,
    color: "#A39B95",
  },
});
