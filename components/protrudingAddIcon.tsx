import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import { TouchableRipple } from "react-native-paper";

type ProtrudingAddIconProps = {
  onPress: () => void;
};

export default function ProtrudingAddIcon({ onPress }: ProtrudingAddIconProps) {
  return (
    <TouchableRipple
      style={[styles.container]}
      onPress={() => {
        onPress();
      }}
    >
      <LinearGradient
        colors={["#1C1816", "#67412e"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.button}
      >
        <Ionicons name="add" size={24} color={"white"} />
      </LinearGradient>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 38,
  },
  button: {
    width: 60,
    height: 60,
    backgroundColor: "#2f95dc",
    justifyContent: "center",
    alignItems: "center",
  },
});
