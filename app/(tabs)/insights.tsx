import BudgetGoalList from "@/components/budgetGoalList";
import CashflowCard from "@/components/cashflowCard";
import GraphContainer from "@/components/graphContainer";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Insights() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <SafeAreaView edges={["top"]} style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Insights</Text>
        </View>

        <GraphContainer />

        <View style={styles.cashFlowContainer}>
          <CashflowCard type={"Income"} color={"green"} percent={"10%"} />
          <CashflowCard type={"Expense"} color={"red"} percent={"10%"} />
        </View>

        <BudgetGoalList />
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  headerContainer: {
    height: 80,
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    marginBottom: -18,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 24,
  },
  calendarButton: {
    marginTop: 8,
  },
  cashFlowContainer: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
});
