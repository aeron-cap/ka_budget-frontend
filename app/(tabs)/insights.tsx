import BudgetGoalList from "@/components/budgetGoalList";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Insights() {
  return (
    <View style={styles.mainBackground}>
      <SafeAreaView edges={["top"]} style={styles.headerCard}>
        <Text style={styles.headerTitle}>Insights</Text>
      </SafeAreaView>

      <ScrollView
        style={styles.listContainer}
        showsVerticalScrollIndicator={false}
      >
        <BudgetGoalList />
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
  headerTitle: {
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 32,
    color: "#FFFFFF",
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});
