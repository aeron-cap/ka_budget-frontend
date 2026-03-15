import BalanceHome from "@/components/balanceHome";
import BudgetGoalContainer from "@/components/budgetGoalsContainer";
import HomeGreeting from "@/components/homeGreeting";
import TransactionList from "@/components/transactionList";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
      <View style={[styles.screenContainer]}>
        <HomeGreeting name={"Aeron Caponpon"} />
        <BalanceHome />
        {/* TODO: Add Budget Goals */}
        <BudgetGoalContainer />
        {/* TODO: Add Recent transactions */}
        <TransactionList />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "slate",
    padding: 24,
  },
});
