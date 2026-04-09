import {
  accountTypeIcons,
  categoryIconsAndTypes,
} from "@/constants/uiElements";
import { CategoryName } from "@/types/entities/categories.type";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

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
  const [searchQuery, setSearchQuery] = useState("");

  const [hasIcons] = useState(() => {
    const firstOption = options?.[0];
    return (
      !!firstOption &&
      (firstOption in categoryIconsAndTypes || firstOption in accountTypeIcons)
    );
  });

  const filteredOptions = useMemo(() => {
    return options.filter((option) =>
      option.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [options, searchQuery]);

  const getIcon = (name: string) => {
    if (name in categoryIconsAndTypes) {
      return categoryIconsAndTypes[name as CategoryName].icon;
    }
    if (name in accountTypeIcons) {
      return accountTypeIcons[name as keyof typeof accountTypeIcons];
    }
    return "help-circle-outline";
  };

  const openDropdown = () => {
    setSearchQuery("");
    setIsOpen(true);
  };

  const handleSelect = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
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

      <Modal
        visible={isOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <View style={styles.modalContentWrapper}>
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setIsOpen(false)}
          />

          <View style={styles.bottomSheet}>
            <View style={styles.dragHandle} />

            <View style={styles.searchContainer}>
              <Ionicons name="search" size={18} color="#94A3B8" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus={true}
                autoCorrect={false}
                clearButtonMode="while-editing"
              />
            </View>

            <FlatList
              data={filteredOptions}
              keyExtractor={(item) => item}
              contentContainerStyle={styles.listContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                const isSelected = selectedValue === item;
                return (
                  <TouchableOpacity
                    style={styles.optionItem}
                    onPress={() => handleSelect(item)}
                  >
                    {hasIcons && (
                      <Ionicons
                        name={getIcon(item)}
                        size={18}
                        color={isSelected ? "#2B60E9" : "#94A3B8"}
                        style={{ marginRight: 12 }}
                      />
                    )}
                    <Text
                      style={[
                        styles.optionText,
                        isSelected && styles.selectedOptionText,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
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
  keyboardAvoidingView: {
    flex: 1,
  },
  modalContentWrapper: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  bottomSheet: {
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "80%",
    minHeight: "80%",
    paddingTop: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 10,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#E2E8F0",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#1E293B",
    paddingVertical: 8,
  },
  listContent: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === "ios" ? 40 : 20, // Extra padding for bottom home indicator
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  optionText: {
    fontSize: 16,
    color: "#475569",
    fontWeight: "500",
  },
  selectedOptionText: {
    color: "#2B60E9",
    fontWeight: "700",
  },
});
