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
}: DropdownProps): React.JSX.Element {
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
        activeOpacity={0.9}
      >
        {hasIcon && (
          <View style={styles.iconBox}>
            <Ionicons name={iconName} size={24} color="#FFFFFF" />
          </View>
        )}
        <View style={styles.textContainer}>
          {label !== "" && <Text style={styles.label}>{label}</Text>}
          <Text style={styles.value}>
            {selectedValue || "Select an option"}
          </Text>
        </View>
        <Ionicons name="chevron-down" size={20} color="#A39B95" />
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
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={18} color="#A39B95" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                placeholderTextColor="#78716C"
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus={true}
                autoCorrect={false}
                clearButtonMode="while-editing"
                selectionColor="#FFFFFF"
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
                        color={isSelected ? "#FFFFFF" : "#A39B95"}
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
    marginBottom: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 0,
    padding: 16,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 0,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontFamily: "PlayfairDisplay_400Regular_Italic",
    fontSize: 14,
    color: "#A39B95",
    marginBottom: 4,
  },
  value: {
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 14,
    color: "#FFFFFF",
  },
  modalContentWrapper: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  bottomSheet: {
    backgroundColor: "#1C1816",
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
    maxHeight: "80%",
    minHeight: "80%",
    paddingTop: 12,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 18,
    color: "#FFFFFF",
    paddingVertical: 8,
  },
  listContent: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === "ios" ? 40 : 20,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
  },
  optionText: {
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 18,
    color: "#A39B95",
  },
  selectedOptionText: {
    color: "#FFFFFF",
  },
});
