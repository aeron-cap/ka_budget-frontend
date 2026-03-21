import BalanceHome from "@/components/balanceHome";
import BudgetGoalContainer from "@/components/budgetGoalsContainer";
import HomeGreeting from "@/components/homeGreeting";
import TransactionList from "@/components/transactionList";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
        <View style={[styles.screenContainer]}>
          <HomeGreeting name={"Aeron Caponpon"} />
          <BalanceHome />
          <BudgetGoalContainer />
          <TransactionList />
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
});
