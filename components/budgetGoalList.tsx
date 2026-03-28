import AddGoalModal from "@/app/modals/addGoal";
import { Saving } from "@/types/savings/savings.type";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type SavingGoalListProps = {
  savings: Saving[];
};

export default function BudgetGoalList({ savings }: SavingGoalListProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const computedHeight = savings.length * 160;

  const handleSaveSaving = (goalData: {
    name: string;
    target: string;
    account: string;
    color: string;
  }) => {
    console.log("Saving new Saving Goal:", goalData);
    setIsModalVisible(false);
  };

  return (
    <View style={[styles.container, { height: computedHeight }]}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Saving Goals</Text>
      </View>

      {savings.map((goal, idx) => {
        const percentage = Math.round(
          (goal.currentAmount / goal.goalAmount) * 100,
        );

        return (
          <TouchableOpacity
            key={idx}
            activeOpacity={0.7}
            style={styles.touchContainer}
          >
            <View>
              <View style={styles.cardTopRow}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: goal.color },
                  ]}
                >
                  <Ionicons name="radio" size={20} color="white" />
                </View>

                <View style={styles.infoContainer}>
                  <Text style={styles.goalTitle}>{goal.description}</Text>
                  <Text style={styles.goalSubtitle}>
                    {goal.currentAmount.toLocaleString()} of{" "}
                    {goal.goalAmount.toLocaleString()}
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
      })}

      <TouchableOpacity
        style={styles.newGoalButton}
        onPress={() => setIsModalVisible(true)}
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
});
