import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, TouchableOpacity } from "react-native";

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
      <LinearGradient
        colors={["#2B60E9", "#1A3A8A"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.button}
      >
        <Ionicons name="add" size={24} color={"white"} />
      </LinearGradient>
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
    elevation: 8,
  },
});
