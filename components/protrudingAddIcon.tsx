import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

type ProtrudingAddIconProps = {
  onPress: () => void;
};

export default function ProtrudingAddIcon({ onPress }: ProtrudingAddIconProps) {
  return (
    <TouchableOpacity
      style={[styles.container]}
      onPress={() => {
        onPress();
      }}
    >
      <View style={[styles.button]}>
        <Ionicons name="add" size={24} color={"white"} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 68,
    height: 68,
    borderRadius: 40,
    backgroundColor: "#2f95dc",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 80,
    borderWidth: 4,
    borderColor: "white",
  },
});
