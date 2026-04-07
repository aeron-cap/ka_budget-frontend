import AddGoalModal from "@/app/modals/addGoal";
import { categoryIconsAndTypes } from "@/constants/uiElements";
import { useCreateBudget } from "@/hooks/useCreateBudget";
import { useGetBudget } from "@/hooks/useGetBudget";
import { Saving } from "@/types/savings/savings.type";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export default function BudgetGoalList() {
  const { budgetList, isFetching, refetch } = useGetBudget("none");
  const { processBudget, isSubmitting } = useCreateBudget();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentGoal, setCurrentGoal] = useState<Saving | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const computedHeight = budgetList.length > 0 ? budgetList.length * 160 : 200;

  useFocusEffect(
    useCallback(() => {
      refetch();

      return () => {};
    }, [refetch]),
  );

  if (isFetching) {
    return <ActivityIndicator size="small" color="#000" />;
  }

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

  const getIcon = (name: string) => {
    if (name in categoryIconsAndTypes) {
      return categoryIconsAndTypes[name].icon;
    }
    return "wallet-outline";
  };

  return (
    <View style={[styles.container, { height: computedHeight }]}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Saving Goals</Text>
      </View>

      {budgetList.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No Saving Goals available.</Text>
          <Text style={styles.emptyHelperText}>
            Add one using the button below.
          </Text>
        </View>
      ) : (
        (budgetList ?? []).map((goal, idx) => {
          const percentage =
            goal.current_amount === goal.goal_amount
              ? 100
              : Math.round(
                  (parseFloat(goal.current_amount) /
                    parseFloat(goal.goal_amount)) *
                    100,
                );

          return (
            <TouchableOpacity
              key={idx}
              activeOpacity={0.7}
              style={styles.touchContainer}
              onPress={() => editSavingGoal(goal)}
            >
              <View>
                <View style={styles.cardTopRow}>
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: goal.color },
                    ]}
                  >
                    <Ionicons
                      name={getIcon(goal.saving_category)}
                      size={20}
                      color="white"
                    />
                  </View>

                  <View style={styles.infoContainer}>
                    <Text style={styles.goalTitle}>{goal.name}</Text>
                    <Text style={styles.goalSubtitle}>
                      {parseFloat(goal.current_amount).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                      of{" "}
                      {parseFloat(goal.goal_amount).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </Text>
                  </View>

                  <Text style={styles.percentageText}>{percentage}%</Text>
                </View>

                <View style={styles.progressBarBackground}>
                  <View
                    style={[
                      styles.progressBarFill,
                      { width: `${percentage}%`, backgroundColor: goal.color },
                    ]}
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        })
      )}

      <TouchableOpacity
        style={styles.newGoalButton}
        onPress={() => {
          setCurrentGoal(null);
          setIsEdit(false);
          setIsModalVisible(true);
        }}
      >
        <Ionicons
          name="flash"
          size={18}
          color="#2563EB"
          style={styles.newGoalIcon}
        />
        <Text style={styles.newGoalText}>Set New Saving Goal</Text>
      </TouchableOpacity>

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

const styles = StyleSheet.create({
  touchContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  container: {
    flex: 1,
    borderRadius: 24,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },
  manageText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3B82F6",
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
  },
  goalTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 4,
  },
  goalSubtitle: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "500",
  },
  percentageText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1E293B",
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: "#F1F5F9",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 3,
  },
  newGoalButton: {
    marginTop: 8,
    paddingVertical: 16,
    borderRadius: 20,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: "#BFDBFE",
    backgroundColor: "#EFF6FF",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  newGoalIcon: {
    marginRight: 8,
  },
  newGoalText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2563EB",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    paddingBottom: 20,
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
