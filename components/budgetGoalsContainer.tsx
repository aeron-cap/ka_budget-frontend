import AddGoalModal from "@/app/modals/addGoal";
import { SAMPLE_SAVINGS } from "@/constants/sampleData";
import { Saving } from "@/types/savings/savings.type";
import { router } from "expo-router";
import { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import BudgetGoal from "./budgetGoal";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const sampleSavings = SAMPLE_SAVINGS;

export default function BudgetGoalContainer() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentGoal, setCurrentGoal] = useState<Saving | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleSaveSaving = (goalData: Saving) => {
    console.log("Saving new Saving Goal:", goalData);
  };

  const editSavingGoal = (goalData: Saving) => {
    if (goalData) {
      setCurrentGoal(goalData);
      setIsEdit(true);
      setIsModalVisible(true);
    }
  };

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
        {sampleSavings.map((b, idx) => {
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
