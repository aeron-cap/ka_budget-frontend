import { useGetBudget } from "@/hooks/useGetBudget";
import { router } from "expo-router";
import {
    ActivityIndicator,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import BudgetGoal from "./budgetGoal";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function BudgetGoalContainer() {
  const { data: budgets = [], isPending: isFetching } = useGetBudget("5");

  if (isFetching) {
    return <ActivityIndicator size="small" color="#FFFFFF" />;
  }

  if (budgets.length === 0) {
    return <View style={{ paddingBottom: 10 }}></View>;
  }

  return (
    <View style={style.wrapper}>
      <View style={style.headerContainer}>
        <Text style={style.headerText}>Saving Goals</Text>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => router.push("/(tabs)/insights")}
        >
          <Text style={style.seeMoreText}>See more</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={style.scrollView}
        contentContainerStyle={style.scrollContent}
      >
        {(budgets ?? []).map((b, idx) => {
          return (
            <View key={idx} style={style.itemWrapper}>
              <BudgetGoal goal={b} onPress={() => null} />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  wrapper: {
    marginTop: 24,
    marginBottom: 8,
  },
  scrollView: {
    // Negative margin to allow the horizontal scroll to bleed to the screen edges
    // while keeping the content aligned with the parent padding
    marginHorizontal: -16,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 16,
  },
  itemWrapper: {
    width: SCREEN_WIDTH * 0.65,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerText: {
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
