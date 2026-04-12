import AddGoalModal from "@/app/modals/addGoal";
import { categoryIconsAndTypes } from "@/constants/uiElements";
import { useCreateBudget } from "@/hooks/useCreateBudget";
import { useGetBudget } from "@/hooks/useGetBudget";
import { Saving } from "@/types/savings/savings.type";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export default function BudgetGoalList() {
  const { data: budgets = [], isPending: isFetching } = useGetBudget("none");
  const { mutate: processBudget, isPending } = useCreateBudget();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentGoal, setCurrentGoal] = useState<Saving | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  if (isFetching) {
    return <ActivityIndicator size="small" color="#FFFFFF" />;
  }

  const handleSaveSaving = async (goalData: Saving) => {
    processBudget(goalData, {
      onSuccess: () => {
        setIsModalVisible(false);
      },
    });
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
      return categoryIconsAndTypes[name as keyof typeof categoryIconsAndTypes]
        .icon;
    }
    return "wallet-outline";
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Saving Goals</Text>
      </View>

      {budgets.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No Saving Goals available.</Text>
          <Text style={styles.emptyHelperText}>
            Add one using the button below.
          </Text>
        </View>
      ) : (
        (budgets ?? []).map((goal, idx) => {
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
                      size={24}
                      color={goal.color === "#FFFFFF" ? "#1C1816" : "#FFFFFF"}
                    />
                  </View>

                  <View style={styles.infoContainer}>
                    <Text style={styles.goalTitle}>
                      {goal.name} - {goal.account}
                    </Text>
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
        activeOpacity={0.7}
        onPress={() => {
          setCurrentGoal(null);
          setIsEdit(false);
          setIsModalVisible(true);
        }}
      >
        <LinearGradient
          colors={["#1C1816", "#67412e"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.newGoalButton}
        >
          <Ionicons
            name="flash"
            size={20}
            color="#FFFFFF"
            style={styles.newGoalIcon}
          />
          <Text style={styles.newGoalText}>Create New Saving/Budget</Text>
        </LinearGradient>
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
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 24,
    color: "#FFFFFF",
  },
  touchContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: 16,
    marginBottom: 16,
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
  },
  goalTitle: {
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 14,
    color: "#FFFFFF",
    marginBottom: 4,
  },
  goalSubtitle: {
    fontFamily: "PlayfairDisplay_400Regular",
    fontSize: 14,
    color: "#A39B95",
  },
  percentageText: {
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 18,
    color: "#FFFFFF",
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  progressBarFill: {
    height: "100%",
  },
  newGoalButton: {
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  newGoalIcon: {
    marginRight: 8,
  },
  newGoalText: {
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 18,
    color: "#FFFFFF",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontFamily: "PlayfairDisplay_400Regular",
    fontSize: 16,
    color: "#78716C",
    textAlign: "center",
    marginBottom: 8,
  },
  emptyHelperText: {
    fontFamily: "PlayfairDisplay_400Regular",
    fontSize: 14,
    color: "#78716C",
    textAlign: "center",
  },
});
