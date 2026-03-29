import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

type TriggerLayout = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type DropdownProps = {
  label: string;
  selectedValue: string;
  iconName: keyof typeof Ionicons.glyphMap;
  options: string[];
  onSelect: (value: string) => void;
  hasIcon: boolean;
};

export default function DropdownInput({
  label,
  selectedValue,
  iconName,
  options,
  onSelect,
  hasIcon,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerLayout, setTriggerLayout] = useState<TriggerLayout | null>(
    null,
  );
  const containerRef = useRef<View>(null);

  const screenHeight = Dimensions.get("window").height;

  const openDropdown = () => {
    containerRef.current?.measureInWindow((x, y, width, height) => {
      setTriggerLayout({ x, y, width, height });
      setIsOpen(true);
    });
  };

  const handleSelect = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  const getDropdownStyle = (): ViewStyle => {
    if (!triggerLayout) return {};
    const { x, y, width, height } = triggerLayout;

    return {
      top: y + height + 8,
      left: x,
      width: width,
      maxHeight: Math.min(screenHeight * 0.4, screenHeight - y - height - 100),
    };
  };

  return (
    <View style={styles.container}>
      <View ref={containerRef} style={{ overflow: "visible" }}>
        <TouchableOpacity
          style={[styles.card, label !== "" && { height: 80 }]}
          onPress={openDropdown}
          activeOpacity={0.7}
        >
          {hasIcon && (
            <View style={styles.iconBox}>
              <Ionicons name={iconName} size={24} color="#64748B" />
            </View>
          )}
          <View style={styles.textContainer}>
            {label !== "" && <Text style={styles.label}>{label}</Text>}
            <Text style={styles.value}>{selectedValue}</Text>
          </View>
          <Ionicons name="chevron-down" size={20} color="#94A3B8" />
        </TouchableOpacity>
      </View>

      <Modal
        visible={isOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        />

        <View style={[styles.floatingDropdown, getDropdownStyle()]}>
          <FlatList
            data={options}
            keyExtractor={(item) => item}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => {
              const isSelected = selectedValue === item;
              return (
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => handleSelect(item)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      isSelected && styles.selectedOptionText,
                    ]}
                  >
                    {item}
                  </Text>
                  {isSelected && (
                    <Ionicons name="checkmark" size={18} color="#2B60E9" />
                  )}
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    overflow: "visible",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 24,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: "500",
    marginBottom: 2,
  },
  value: {
    fontSize: 14,
    color: "#1E293B",
    fontWeight: "700",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "transparent",
  },
  floatingDropdown: {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 10,
    overflow: "hidden",
  },
  listContent: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  optionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  optionText: {
    fontSize: 15,
    color: "#475569",
    fontWeight: "500",
  },
  selectedOptionText: {
    color: "#2B60E9",
    fontWeight: "700",
  },
});
