import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";
import { ProgressBar } from "react-native-paper";

type BudgetGoalProps = {
  color: string;
  description: string;
  account: string;
  currentAmount: string;
  goalAmount: string;
};

export default function BudgetGoal() {
  return (
    <View style={[style.goalContainer]}>
      <View style={style.iconContainer}>
        <Ionicons name="wallet-outline" size={18} color={"white"} />
      </View>
      <Text style={style.description}>Description</Text>
      <View>
        <Text style={{ marginBottom: 4, fontSize: 12 }}>Progress Track</Text>
        <View style={{ overflow: "hidden", borderRadius: 12 }}>
          <ProgressBar animatedValue={0.5} color="blue" />
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  goalContainer: {
    flex: 1,
    borderRadius: 28,
    marginBottom: 8,
    padding: 24,
    width: 160,
    backgroundColor: "white",
  },
  iconContainer: {
    height: 40,
    width: 40,
    borderRadius: 12,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    marginBottom: 12,
  },
  // limit character size
  description: {
    fontSize: 18,
    fontWeight: "bold",
    color: "slate",
    marginBottom: 8,
  },
  progress: {},
});
