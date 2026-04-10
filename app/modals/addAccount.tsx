import ColorPicker from "@/components/colorPicker";
import DropdownInput from "@/components/dropdownInput";
import { accountTypes } from "@/constants/accountTypes";
import { categories } from "@/constants/categories";
import { Validator } from "@/helpers/helpers";
import { getLocalUser } from "@/service/local/service";
import { Account } from "@/types/accounts/accounts.type";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Keyboard,
  KeyboardEvent,
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
  isOnboarding?: boolean;
}

export default function AddAccount({
  isVisible,
  onClose,
  onSave,
  accountData,
  isEdit,
  isOnboarding = false,
}: AddAccountProps): React.JSX.Element | null {
  const [renderModal, setRenderModal] = useState(isVisible);
  const [isValidTransaction, setIsValidTransaction] = useState(false);
  const [userName, setUserName] = useState("");
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const [form, setForm] = useState<Account>({
    id: "",
    name: "",
    account_type: accountTypes[0],
    initial_balance: "0",
    current_balance: "0",
    account_category: "",
    color: "#FFFFFF",
    show_in_home: true,
  });

  useEffect(() => {
    const fetchUserName = async () => {
      const userStr = await getLocalUser();
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          if (user && user.name) {
            setUserName(user.name);
          }
        } catch (e) {
          setUserName("");
        }
      }
    };
    if (isOnboarding) {
      fetchUserName();
    }
  }, [isOnboarding]);

  useEffect(() => {
    const showEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const onShow = (e: KeyboardEvent) => {
      setKeyboardHeight(e.endCoordinates.height);
    };
    const onHide = () => {
      setKeyboardHeight(0);
    };

    const showSub = Keyboard.addListener(showEvent, onShow);
    const hideSub = Keyboard.addListener(hideEvent, onHide);

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

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
        show_in_home: accountData?.show_in_home || true,
      };
      setForm(nextForm);

      const { errors } = Validator(nextForm, "Account");
      setIsValidTransaction(errors.length === 0);
    } else {
      setKeyboardHeight(0);
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
  }, [isVisible, accountData]);

  const handleSave = () => {
    onSave(form);
  };

  const handleInputChange = (
    name: keyof typeof form,
    value: string | boolean,
  ) => {
    const nextForm = { ...form, [name]: value };
    setForm(nextForm);
    const { errors } = Validator(nextForm, "Account");
    setIsValidTransaction(errors.length === 0);
  };

  if (!renderModal) return null;

  const scrollPaddingBottom =
    keyboardHeight > 0 ? keyboardHeight + 80 : Platform.OS === "ios" ? 40 : 24;

  return (
    <Modal
      visible={renderModal}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.modalWrapper}>
        <Animated.View style={[StyleSheet.absoluteFill, { opacity: fadeAnim }]}>
          {isOnboarding ? (
            <View style={styles.onboardingBackground}>
              <View style={styles.onboardingTopRow}>
                <TouchableOpacity
                  style={styles.skipButton}
                  onPress={onClose}
                  activeOpacity={0.7}
                >
                  <Text style={styles.skipText}>Let&apos;s do it later</Text>
                  <Ionicons name="chevron-forward" size={16} color="#A39B95" />
                </TouchableOpacity>
              </View>
              <View style={styles.onboardingHeaderContainer}>
                <Text style={styles.onboardingGreeting}>
                  Greetings, {userName}!
                </Text>
                <Text style={styles.onboardingSubtitle}>
                  Let&apos;s get started by adding your first account to track
                  your wealth.
                </Text>
              </View>
            </View>
          ) : (
            <>
              <BlurView
                intensity={60}
                tint="dark"
                style={StyleSheet.absoluteFill}
              />
              <TouchableOpacity
                style={styles.dismissArea}
                activeOpacity={1}
                onPress={onClose}
              />
            </>
          )}
        </Animated.View>

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
            keyboardDismissMode="interactive"
            contentContainerStyle={[
              styles.scrollContainer,
              { paddingBottom: scrollPaddingBottom },
            ]}
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

                {!isOnboarding && (
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={onClose}
                  >
                    <Ionicons name="close" size={24} color="#FFFFFF" />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <Text style={styles.inputLabel}>Account Name</Text>
            <TextInput
              style={styles.inputField}
              placeholder="e.g. Daily Expenses"
              placeholderTextColor="#78716C"
              value={form.name}
              onChangeText={(value) => handleInputChange("name", value)}
              selectionColor="#FFFFFF"
            />

            <Text style={styles.inputLabel}>Account Type</Text>
            <DropdownInput
              label=""
              selectedValue={form.account_type}
              iconName="wallet-outline"
              options={accountTypes}
              onSelect={(text) => handleInputChange("account_type", text)}
              hasIcon={false}
            />

            <Text style={styles.inputLabel}>Account Category</Text>
            <DropdownInput
              label=""
              selectedValue={form.account_category}
              iconName="grid-outline"
              options={categories}
              onSelect={(text) => handleInputChange("account_category", text)}
              hasIcon={false}
            />

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
          </ScrollView>
          <View style={styles.bottomExtension} />
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: "flex-end",
  },
  onboardingBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#1C1816",
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingHorizontal: 16,
  },
  onboardingTopRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
  },
  skipButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingLeft: 16,
  },
  skipText: {
    fontSize: 14,
    color: "#A39B95",
    marginRight: 2,
    includeFontPadding: false,
    textAlignVertical: "center",
  },
  onboardingHeaderContainer: {},
  onboardingGreeting: {
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 32,
    color: "#FFFFFF",
  },
  onboardingSubtitle: {
    fontSize: 18,
    color: "#A39B95",
    lineHeight: 22,
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
    flexGrow: 1,
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
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
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
    height: 60,
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 18,
    color: "#FFFFFF",
  },
  dropdownContainer: {
    minHeight: 60,
    justifyContent: "center",
  },
  amountInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
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
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
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
    fontSize: 14,
    color: "#FFFFFF",
  },
});
