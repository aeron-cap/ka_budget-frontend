import ColorPicker from "@/components/colorPicker";
import DropdownInput from "@/components/dropdownInput";
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
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const ACCOUNT_TYPES = [
  "Digital Bank",
  "Traditional Bank",
  "Credit Card",
  "Cash",
];

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
}: AddAccountProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [renderModal, setRenderModal] = useState(isVisible);
  const [isValidTransaction, setIsValidTransaction] = useState(false);
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [form, setForm] = useState<Account>({
    id: "",
    name: "",
    account_type: ACCOUNT_TYPES[0],
    initial_balance: "0",
    current_balance: "0",
    account_category: "",
    color: "#000000",
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
        account_type: accountData ? accountData.account_type : ACCOUNT_TYPES[0],
        initial_balance: accountData ? accountData.initial_balance : "0",
        current_balance: accountData ? accountData.current_balance : "0",
        account_category: accountData?.account_category || "",
        color: accountData?.color || "#000000",
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

  const handleInputChange = (name: keyof typeof form, value: string) => {
    const nextForm = {
      ...form,
      [name]: value,
    };

    setForm(nextForm);

    const { errors } = Validator(nextForm, "Account");
    console.log(errors);
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
          behavior={Platform.OS === "ios" ? "padding" : "padding"}
          pointerEvents="box-none"
          style={styles.keyboardAvoid}
        >
          <Animated.View
            style={[
              styles.modalContent,
              { transform: [{ translateY: slideAnim }] },
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {isEdit ? "Edit" : "New"} Account
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleClose}
              >
                <Ionicons name="close" size={20} color="#64748B" />
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>Account Name</Text>
            <TextInput
              style={styles.inputField}
              placeholder="e.g. Chase Checking"
              placeholderTextColor="#94A3B8"
              value={form.name}
              onChangeText={(value) => handleInputChange("name", value)}
            />

            <Text style={styles.inputLabel}>Account Type</Text>
            <DropdownInput
              label=""
              selectedValue={form.account_type}
              iconName="link"
              options={ACCOUNT_TYPES}
              onSelect={(text) => handleInputChange("account_type", text)}
              hasIcon={false}
            />

            <Text style={styles.inputLabel}>Account Category</Text>
            <DropdownInput
              label=""
              selectedValue={form.account_category}
              iconName="link"
              options={categories}
              onSelect={(text) => handleInputChange("account_category", text)}
              hasIcon={false}
            />

            <View style={styles.lowerSection}>
              <Text style={styles.inputLabel}>Initial Balance</Text>
              <View style={styles.amountInputContainer}>
                <TextInput
                  style={styles.amountInput}
                  placeholder="0.00"
                  placeholderTextColor="#94A3B8"
                  keyboardType="numeric"
                  value={form.initial_balance}
                  onChangeText={(value) =>
                    handleInputChange("initial_balance", value)
                  }
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
                      : "#94A3B8",
                  },
                ]}
                onPress={handleSave}
                disabled={!isValidTransaction}
              >
                <Text style={styles.saveBtnText}>
                  {isEdit ? "Edit" : "Save"} Account
                </Text>
              </TouchableOpacity>
            </View>

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
    width: "100%",
    justifyContent: "flex-end",
  },
  dismissArea: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: Platform.OS === "ios" ? 40 : 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  bottomExtension: {
    position: "absolute",
    bottom: -1000,
    left: 0,
    right: 0,
    height: 1000,
    backgroundColor: "white",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 8,
    marginTop: 16,
  },
  inputField: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
    fontSize: 15,
    color: "#1E293B",
  },
  dropdownZIndexWrapper: {
    ...(Platform.OS === "ios"
      ? { zIndex: 1000 }
      : { elevation: 1000, zIndex: 1000 }),
  },
  dropdownAnchor: {
    position: "relative",
    zIndex: 1000,
  },
  absoluteDropdownList: {
    position: "absolute",
    top: 54,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingVertical: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
    zIndex: 1000,
  },
  dropdownTrigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
  },
  dropdownText: {
    fontSize: 15,
    color: "#1E293B",
  },
  dropdownItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  lastDropdownItem: {
    borderBottomWidth: 0,
  },
  dropdownItemText: {
    fontSize: 15,
    color: "#475569",
  },
  dropdownItemTextActive: {
    color: "#2563EB",
    fontWeight: "600",
  },
  lowerSection: {
    ...(Platform.OS === "ios" ? { zIndex: -1 } : { elevation: -1, zIndex: -1 }),
  },
  amountInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
  },
  currencyPrefix: {
    fontSize: 15,
    color: "#64748B",
    fontWeight: "600",
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 15,
    color: "#1E293B",
  },
  saveBtn: {
    borderRadius: 14,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },
  saveBtnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
});
