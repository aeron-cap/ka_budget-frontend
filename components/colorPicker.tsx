import { THEME_COLORS } from "@/constants/sampleData";
import { StyleSheet, TouchableOpacity, View } from "react-native";

type ColorPickerProps = {
  selectedColor: string;
  changeColor: (color: string) => void;
};

export default function ColorPicker({
  selectedColor,
  changeColor,
}: ColorPickerProps) {
  return (
    <View style={styles.colorRow}>
      {THEME_COLORS.map((color) => {
        const isSelected = selectedColor === color;
        return (
          <TouchableOpacity
            key={color}
            activeOpacity={0.8}
            onPress={() => changeColor(color)}
            style={[
              styles.colorOuterCircle,
              isSelected
                ? { borderColor: color }
                : { borderColor: "transparent" },
            ]}
          >
            <View
              style={[styles.colorInnerCircle, { backgroundColor: color }]}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  colorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 4,
  },
  colorOuterCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  colorInnerCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
});
