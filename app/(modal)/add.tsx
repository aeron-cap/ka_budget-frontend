import { router } from "expo-router";
import { Pressable, Text } from "react-native";

export default function AddModal() {
  // option to choose from
  // Income, Expense, Installment, Transfer
  const go = (path: string) => {
    router.back();
    router.push(path);
  };

  return(
    <Pressable
      style={{
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.35)"
      }}
      onPress={() => router.back()}
    >
      <Pressable
        onPress={() => {}}  
        style={{
          marginTop: "auto",
          backgroundColor: "#fff",
          padding: 20,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          gap: 14,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "700" }}>
          Add
        </Text>
        
        {/* Options */}
        <Pressable
          onPress={() => go("/add/income")}
          style={{ paddingVertical: 10 }}
        >
          <Text style={{ fontSize: 16 }}>
            Income
          </Text>
        </Pressable>

      </Pressable>
    </Pressable>
  )
}