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
      return categoryIconsAndTypes[name].icon;
    }
    return "wallet-outline";
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onPress(goal)}
      style={style.touchContainer}
    >
      <View style={[style.goalContainer]}>
        <View>
          <View
            style={[
              style.iconContainer,
              { backgroundColor: goal.color, borderRadius: 12 },
            ]}
          >
            <Ionicons
              name={getIcon(goal.saving_category)}
              size={18}
              color={"white"}
            />
          </View>
          <Text style={style.description}>{goal.name}</Text>
        </View>
        <View style={style.progress}>
          <Text style={{ marginBottom: 4, fontSize: 12 }}>
            {" "}
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
          <View style={{ overflow: "hidden", borderRadius: 12 }}>
            <View style={style.progressBarBackground}>
              <View
                style={[
                  style.progressBarFill,
                  { width: `${percentage}%`, backgroundColor: goal.color },
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
  goalContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  iconContainer: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    marginBottom: 12,
  },
  description: {
    fontSize: 18,
    fontWeight: "bold",
    color: "slate",
    marginBottom: 8,
  },
  progress: {
    marginBottom: 8,
  },
  touchContainer: {
    flex: 1,
    borderRadius: 28,
    padding: 20,
    width: 200,
    backgroundColor: "white",
    justifyContent: "space-between",
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
});
