import AddGoalModal from "@/app/modals/addGoal";
import { useCreateBudget } from "@/hooks/useCreateBudget";
import { useGetBudget } from "@/hooks/useGetBudget";
import { Saving } from "@/types/savings/savings.type";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import BudgetGoal from "./budgetGoal";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function BudgetGoalContainer() {
  const { budgetList, isFetching, refetch } = useGetBudget("5");
  const { processBudget, isSubmitting } = useCreateBudget();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentGoal, setCurrentGoal] = useState<Saving | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      refetch();

      return () => {};
    }, [refetch]),
  );

  const handleSaveSaving = (goalData: Saving) => {
    processBudget(goalData);
    setIsModalVisible(false);
    refetch();
  };

  const editSavingGoal = (goalData: Saving) => {
    if (goalData) {
      setCurrentGoal(goalData);
      setIsEdit(true);
      setIsModalVisible(true);
    }
  };

  if (isFetching) {
    return <ActivityIndicator size="small" color="#000" />;
  }

  if (budgetList.length === 0) {
    return <View style={{ paddingBottom: 10 }}></View>;
  }

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
        {(budgetList ?? []).map((b, idx) => {
          return (
            <View key={idx} style={style.itemWrapper}>
              <BudgetGoal goal={b} onPress={() => editSavingGoal(b)} />
            </View>
          );
        })}
      </ScrollView>

      <AddGoalModal
        isVisible={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
        }}
        onSave={handleSaveSaving}
        goalData={currentGoal}
        isEdit={isEdit}
      />
    </View>
  );
}

const style = StyleSheet.create({
  wrapper: {
    width: SCREEN_WIDTH,
    alignSelf: "center",
    height: 220,
    margin: 8,
    marginBottom: 24,
  },
  scrollContent: {
    paddingHorizontal: 24,
    gap: 8,
  },
  itemWrapper: {
    width: SCREEN_WIDTH * 0.5,
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },
  emptyHelperText: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
});
