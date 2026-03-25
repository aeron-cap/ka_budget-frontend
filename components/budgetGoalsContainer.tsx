import { router } from "expo-router";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import BudgetGoal from "./budgetGoal";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function BudgetGoalContainer() {
  return (
    <View style={style.wrapper}>
      <View style={style.headerContainer}>
        <Text style={style.headerText}>Saving Goals</Text>
        <Text onPress={() => router.push("/(tabs)/insights")}>See more</Text>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={style.scrollContent}
      >
        {[1, 2, 3].map((b, idx) => {
          return (
            <View key={idx} style={style.itemWrapper}>
              <BudgetGoal />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  wrapper: {
    width: SCREEN_WIDTH,
    alignSelf: "center",
    height: 240,
    margin: 8,
    marginBottom: 24,
  },
  scrollContent: {
    paddingHorizontal: 24,
    gap: 8,
  },
  itemWrapper: {
    width: SCREEN_WIDTH * 0.4,
  },
  headerContainer: {
    paddingLeft: 24,
    marginBottom: 16,
    marginRight: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
