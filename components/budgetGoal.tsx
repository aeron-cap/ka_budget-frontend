import { categoryIconsAndTypes } from "@/constants/uiElements";
import { Saving } from "@/types/savings/savings.type";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type BudgetGoalProps = {
  goal: Saving;
  onPress: (goal: Saving) => void;
};

export default function BudgetGoal({ goal, onPress }: BudgetGoalProps) {
  const percentage = Math.round(
    (parseFloat(goal.current_amount) / parseFloat(goal.goal_amount)) * 100,
  );

  const getIcon = (name: string) => {
    if (name in categoryIconsAndTypes) {
      return categoryIconsAndTypes[name as keyof typeof categoryIconsAndTypes]
        .icon;
    }
    return "wallet-outline";
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => onPress(goal)}
      style={style.touchContainer}
    >
      <View style={style.goalContainer}>
        <View>
          <View style={[style.iconContainer, { backgroundColor: goal.color }]}>
            <Ionicons
              name={getIcon(goal.saving_category)}
              size={24}
              color={goal.color === "#FFFFFF" ? "#1C1816" : "#FFFFFF"}
            />
          </View>
          <Text style={style.description} numberOfLines={1}>
            {goal.name}
          </Text>
        </View>
        <View style={style.progress}>
          <Text style={style.progressText}>
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
          <View style={style.progressBarWrapper}>
            <View style={style.progressBarBackground}>
              <View
                style={[
                  style.progressBarFill,
                  {
                    width: `${percentage > 100 ? 100 : percentage}%`,
                    backgroundColor: goal.color,
                  },
                ]}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  touchContainer: {
    flex: 1,
    borderRadius: 24,
    padding: 20,
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "space-between",
  },
  goalContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  iconContainer: {
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    marginBottom: 16,
  },
  description: {
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 20,
    color: "#FFFFFF",
    marginBottom: 16,
  },
  progress: {
    marginBottom: 4,
  },
  progressText: {
    fontFamily: "PlayfairDisplay_400Regular",
    fontSize: 12,
    color: "#A39B95",
    marginBottom: 8,
  },
  progressBarWrapper: {
    overflow: "hidden",
    borderRadius: 12,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 4,
  },
});
