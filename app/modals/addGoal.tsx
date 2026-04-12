import ColorPicker from "@/components/colorPicker";
import DropdownInput from "@/components/dropdownInput";
import { categories } from "@/constants/categories";
import { THEME_COLORS } from "@/constants/uiElements";
import { Validator } from "@/helpers/helpers";
import { useGetAccounts } from "@/hooks/useGetAccounts";
import { Saving } from "@/types/savings/savings.type";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface AddGoalModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (goalData: Saving) => void;
  goalData?: Saving | null;
  isEdit: boolean;
}

export default function AddGoalModal({
  isVisible,
  onClose,
  onSave,
  goalData,
  isEdit,
}: AddGoalModalProps) {
  const { data: accounts = [], isPending } = useGetAccounts("none");
  const accountNameList = useMemo(() => {
    return accounts.map((account) => account.name);
  }, [accounts]);

  const [form, setForm] = useState<Saving>({
    id: "",
    color: THEME_COLORS[0],
    name: "",
    account: accountNameList[0],
    initial_amount: "0",
    current_amount: "0",
    goal_amount: "0",
    saving_category: "",
  });

  const [isSavingsValid, setIsSavingsValid] = useState(goalData ? true : false);
  const [renderModal, setRenderModal] = useState(isVisible);
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      setRenderModal(true);
      setForm({
        id: goalData?.id ?? "",
        color: goalData?.color ?? THEME_COLORS[0],
        name: goalData?.name ?? "",
        account: goalData?.account ?? accountNameList[0],
        initial_amount: goalData?.initial_amount
          ? goalData?.initial_amount
          : "0",
        current_amount: goalData?.current_amount
          ? goalData?.current_amount
          : "0",
        goal_amount: goalData?.goal_amount ? goalData?.goal_amount : "0",
        saving_category: goalData?.saving_category ?? "",
      });

      requestAnimationFrame(() => {
        Animated.parallel([
          Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: true,
            damping: 50,
            stiffness: 500,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
      });
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: SCREEN_HEIGHT,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => setRenderModal(false));
    }
  }, [isVisible, goalData, accountNameList]);

  const handleInputChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

    const { errors } = Validator({ ...form, [key]: value }, "Saving");
    setIsSavingsValid(errors.length === 0);
  };

  const handleSave = () => {
    onSave(form);
  };

  if (!renderModal) return null;

  return (
    <Modal
      visible={renderModal}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <View style={styles.modalWrapper}>
          <Animated.View
            style={[
              styles.modalContent,
              { transform: [{ translateY: slideAnim }], opacity: fadeAnim },
            ]}
          >
            <ScrollView
              bounces={false}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="interactive"
              contentContainerStyle={styles.scrollContainer}
            >
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  {isEdit ? "Edit" : "New"} Savings Goal
                </Text>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                  <Ionicons name="close" size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </View>

              <View style={styles.row}>
                <View style={styles.flexItem}>
                  <Text style={styles.inputLabel}>Goal Name</Text>
                  <TextInput
                    style={styles.inputField}
                    placeholder="e.g. Dream House"
                    placeholderTextColor="#78716C"
                    value={form.name}
                    onChangeText={(text) => handleInputChange("name", text)}
                    selectionColor="#FFFFFF"
                    maxLength={15}
                  />
                </View>

                <View style={styles.flexItem}>
                  <Text style={styles.inputLabel}>Category</Text>
                  <DropdownInput
                    label=""
                    selectedValue={form.saving_category}
                    iconName="grid-outline"
                    options={categories}
                    onSelect={(text) =>
                      handleInputChange("saving_category", text)
                    }
                    hasIcon={false}
                  />
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.flexItem}>
                  <Text style={styles.inputLabel}>Initial Amount</Text>
                  <View style={styles.amountInputContainer}>
                    <Text style={styles.currencyPrefix}>P</Text>
                    <TextInput
                      style={styles.amountInput}
                      placeholder="0.00"
                      placeholderTextColor="#78716C"
                      keyboardType="numeric"
                      value={form.initial_amount}
                      onChangeText={(text) =>
                        handleInputChange("initial_amount", text)
                      }
                      selectionColor="#FFFFFF"
                    />
                  </View>
                </View>

                <View style={styles.flexItem}>
                  <Text style={styles.inputLabel}>Target Amount</Text>
                  <View style={styles.amountInputContainer}>
                    <Text style={styles.currencyPrefix}>P</Text>
                    <TextInput
                      style={styles.amountInput}
                      placeholder="0.00"
                      placeholderTextColor="#78716C"
                      keyboardType="numeric"
                      value={form.goal_amount}
                      onChangeText={(text) =>
                        handleInputChange("goal_amount", text)
                      }
                      selectionColor="#FFFFFF"
                    />
                  </View>
                </View>
              </View>

              <Text style={styles.inputLabel}>Account</Text>
              <DropdownInput
                label=""
                selectedValue={form.account}
                iconName="wallet-outline"
                options={accountNameList}
                onSelect={(text) => handleInputChange("account", text)}
                hasIcon={false}
              />

              <Text style={styles.inputLabel}>Theme Color</Text>
              <ColorPicker
                selectedColor={form.color}
                changeColor={(color) => handleInputChange("color", color)}
              />

              <TouchableOpacity
                style={[
                  styles.saveBtn,
                  {
                    backgroundColor: isSavingsValid
                      ? form.color
                      : "rgba(255, 255, 255, 0.1)",
                  },
                ]}
                activeOpacity={0.9}
                onPress={handleSave}
                disabled={!isSavingsValid}
              >
                <Text
                  style={[
                    styles.saveBtnText,
                    !isSavingsValid && styles.saveBtnTextDisabled,
                    isSavingsValid && {
                      color: form.color === "#FFFFFF" ? "#1C1816" : "#FFFFFF",
                    },
                  ]}
                >
                  {isEdit ? "Edit" : "Create"} Goal
                </Text>
              </TouchableOpacity>
            </ScrollView>
            <View style={styles.bottomExtension} />
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
  },
  modalWrapper: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    flex: 1,
    backgroundColor: "#1C1816",
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
    paddingTop: Platform.OS === "ios" ? 60 : 40,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === "ios" ? 60 : 40,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  modalTitle: {
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 24,
    color: "#FFFFFF",
  },
  closeButton: {
    width: 36,
    height: 36,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    width: "100%",
    gap: 12,
  },
  flexItem: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 14,
    color: "#A39B95",
    marginBottom: 8,
    marginTop: 16,
  },
  inputField: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    paddingHorizontal: 16,
    height: 52,
    fontSize: 14,
    color: "#FFFFFF",
  },
  amountInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    paddingHorizontal: 16,
    height: 60,
  },
  currencyPrefix: {
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 18,
    color: "#78716C",
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 18,
    color: "#FFFFFF",
  },
  saveBtn: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },
  saveBtnText: {
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 18,
  },
  saveBtnTextDisabled: {
    color: "#78716C",
  },
  bottomExtension: {
    position: "absolute",
    bottom: -1000,
    left: 0,
    right: 0,
    height: 1000,
    backgroundColor: "#1C1816",
  },
});
