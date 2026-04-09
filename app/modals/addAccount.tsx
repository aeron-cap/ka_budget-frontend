import ColorPicker from "@/components/colorPicker";
import DropdownInput from "@/components/dropdownInput";
import { accountTypes } from "@/constants/accountTypes";
import { categories } from "@/constants/categories";
import { Validator } from "@/helpers/helpers";
import { Account } from "@/types/accounts/accounts.type";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React, { useEffect, useRef, useState } from "react";
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

interface AddAccountProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (accountData: Account) => void;
  accountData?: Account | null;
  isEdit: boolean;
}

export default function AddAccount({
  isVisible,
  onClose,
  onSave,
  accountData,
  isEdit,
}: AddAccountProps): React.JSX.Element | null {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [renderModal, setRenderModal] = useState(isVisible);
  const [isValidTransaction, setIsValidTransaction] = useState(false);
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [form, setForm] = useState<Account>({
    id: "",
    name: "",
    account_type: accountTypes[0],
    initial_balance: "0",
    current_balance: "0",
    account_category: "",
    color: "#FFFFFF",
    show_in_home: false,
  });

  useEffect(() => {
    if (isVisible) {
      setRenderModal(true);
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      const nextForm = {
        id: accountData ? accountData.id : "",
        name: accountData ? accountData.name : "",
        account_type: accountData ? accountData.account_type : accountTypes[0],
        initial_balance: accountData ? accountData.initial_balance : "0",
        current_balance: accountData ? accountData.current_balance : "0",
        account_category: accountData?.account_category || "",
        color: accountData?.color || "#FFFFFF",
        show_in_home: accountData?.show_in_home || false,
      };
      setForm(nextForm);

      const { errors } = Validator(nextForm, "Account");
      setIsValidTransaction(errors.length === 0);
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
  }, [isVisible, slideAnim, fadeAnim, accountData]);

  const handleSave = () => {
    onSave(form);
    setIsDropdownOpen(false);
  };

  const handleClose = () => {
    setIsDropdownOpen(false);
    onClose();
  };

  const handleInputChange = (
    name: keyof typeof form,
    value: string | boolean,
  ) => {
    const nextForm = {
      ...form,
      [name]: value,
    };
    setForm(nextForm);
    const { errors } = Validator(nextForm, "Account");
    setIsValidTransaction(errors.length === 0);
  };

  if (!renderModal) return null;

  return (
    <Modal
      visible={renderModal}
      transparent={true}
      animationType="none"
      onRequestClose={handleClose}
      statusBarTranslucent
      navigationBarTranslucent
    >
      <View style={styles.modalWrapper}>
        <Animated.View style={[StyleSheet.absoluteFill, { opacity: fadeAnim }]}>
          <BlurView
            intensity={60}
            tint="dark"
            style={StyleSheet.absoluteFill}
          />
          <TouchableOpacity
            style={styles.dismissArea}
            activeOpacity={1}
            onPress={handleClose}
          />
        </Animated.View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          pointerEvents="box-none"
          style={styles.keyboardAvoid}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          <Animated.View
            style={[
              styles.modalContent,
              { transform: [{ translateY: slideAnim }] },
            ]}
          >
            <ScrollView
              bounces={false}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.scrollContainer}
            >
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  {isEdit ? "Edit" : "New"} Account
                </Text>

                <View style={styles.headerActions}>
                  <TouchableOpacity
                    style={styles.switchWrapper}
                    activeOpacity={0.9}
                    onPress={() =>
                      handleInputChange("show_in_home", !form.show_in_home)
                    }
                  >
                    <View
                      style={[
                        styles.checkbox,
                        form.show_in_home && styles.checkboxActive,
                      ]}
                    >
                      {form.show_in_home && (
                        <Ionicons name="checkmark" size={14} color="#1C1816" />
                      )}
                    </View>
                    <Text style={styles.switchHelperText}>Dashboard</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={handleClose}
                  >
                    <Ionicons name="close" size={24} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              </View>

              <Text style={styles.inputLabel}>Account Name</Text>
              <TextInput
                style={styles.inputField}
                placeholder="e.g. Chase Checking"
                placeholderTextColor="#78716C"
                value={form.name}
                onChangeText={(value) => handleInputChange("name", value)}
                selectionColor="#FFFFFF"
              />

              <Text style={styles.inputLabel}>Account Type</Text>
              <View style={styles.dropdownContainer}>
                <DropdownInput
                  label=""
                  selectedValue={form.account_type}
                  iconName="wallet-outline"
                  options={accountTypes}
                  onSelect={(text) => handleInputChange("account_type", text)}
                  hasIcon={false}
                />
              </View>

              <Text style={styles.inputLabel}>Account Category</Text>
              <View style={styles.dropdownContainer}>
                <DropdownInput
                  label=""
                  selectedValue={form.account_category}
                  iconName="grid-outline"
                  options={categories}
                  onSelect={(text) =>
                    handleInputChange("account_category", text)
                  }
                  hasIcon={false}
                />
              </View>

              <View style={styles.lowerSection}>
                <Text style={styles.inputLabel}>Initial Balance</Text>
                <View style={styles.amountInputContainer}>
                  <TextInput
                    style={styles.amountInput}
                    placeholder="0.00"
                    placeholderTextColor="#78716C"
                    keyboardType="numeric"
                    value={form.initial_balance}
                    onChangeText={(value) =>
                      handleInputChange("initial_balance", value)
                    }
                    selectionColor="#FFFFFF"
                  />
                </View>

                <Text style={styles.inputLabel}>Theme Color</Text>
                <ColorPicker
                  selectedColor={form.color}
                  changeColor={(color) => handleInputChange("color", color)}
                />

                <TouchableOpacity
                  style={[
                    styles.saveBtn,
                    {
                      backgroundColor: isValidTransaction
                        ? form.color
                        : "rgba(255, 255, 255, 0.1)",
                    },
                  ]}
                  onPress={handleSave}
                  disabled={!isValidTransaction}
                  activeOpacity={0.9}
                >
                  <Text
                    style={[
                      styles.saveBtnText,
                      !isValidTransaction && styles.saveBtnTextDisabled,
                      isValidTransaction && {
                        color: form.color === "#FFFFFF" ? "#1C1816" : "#FFFFFF",
                      },
                    ]}
                  >
                    {isEdit ? "Edit" : "Save"} Account
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
            <View style={styles.bottomExtension} />
          </Animated.View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: "flex-end",
  },
  keyboardAvoid: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
  },
  dismissArea: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContent: {
    backgroundColor: "#1C1816",
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
    maxHeight: SCREEN_HEIGHT * 0.85,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: Platform.OS === "ios" ? 60 : 40,
  },
  bottomExtension: {
    position: "absolute",
    bottom: -1000,
    left: 0,
    right: 0,
    height: 1000,
    backgroundColor: "#1C1816",
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
    borderRadius: 0,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
  },
  inputLabel: {
    fontFamily: "PlayfairDisplay_400Regular_Italic",
    fontSize: 14,
    color: "#A39B95",
    marginBottom: 8,
    marginTop: 16,
  },
  inputField: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 0,
    paddingHorizontal: 16,
    height: 60,
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 18,
    color: "#FFFFFF",
  },
  dropdownContainer: {
    minHeight: 60,
    justifyContent: "center",
  },
  lowerSection: {
    zIndex: -1,
    elevation: -1,
  },
  amountInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 0,
    paddingHorizontal: 16,
    height: 60,
  },
  amountInput: {
    flex: 1,
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 18,
    color: "#FFFFFF",
  },
  saveBtn: {
    borderRadius: 0,
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
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  switchWrapper: {
    alignItems: "center",
    marginRight: 16,
    flexDirection: "row",
    paddingVertical: 8,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: "#A39B95",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  checkboxActive: {
    backgroundColor: "#FFFFFF",
    borderColor: "#FFFFFF",
  },
  switchHelperText: {
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 14,
    color: "#FFFFFF",
  },
});
