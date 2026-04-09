import ColorPicker from "@/components/colorPicker";
import DropdownInput from "@/components/dropdownInput";
import { categories } from "@/constants/categories";
import { THEME_COLORS } from "@/constants/sampleData";
import { Validator } from "@/helpers/helpers";
import { useGetAccounts } from "@/hooks/useGetAccounts";
import { Saving } from "@/types/savings/savings.type";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React, {
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
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
  }, [isVisible, slideAnim, fadeAnim, goalData, accountNameList]);

  const handleInputChange = (name: keyof typeof form, value: string) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    const { errors } = Validator(form, "Saving");
    setIsSavingsValid(errors.length === 0);
  };

  const handleSave = () => {
    onSave(form);
  };

  const handleClose = () => {
    onClose();
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
                {isEdit ? "Edit" : "New"} Savings Goal
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleClose}
              >
                <Ionicons name="close" size={20} color="#64748B" />
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row", gap: 12 }}>
              <View style={{ flexDirection: "column", width: "50%" }}>
                <Text style={styles.inputLabel}>Goal Name</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="e.g. Dream House"
                  placeholderTextColor="#94A3B8"
                  value={form.name}
                  onChangeText={(text) => handleInputChange("name", text)}
                />
              </View>

              <View style={{ flexDirection: "column", width: "50%" }}>
                <Text style={styles.inputLabel}>Category</Text>
                <DropdownInput
                  label=""
                  selectedValue={form.saving_category}
                  iconName="radio-button-on"
                  options={categories}
                  onSelect={(text) =>
                    handleInputChange("saving_category", text)
                  }
                  hasIcon={false}
                />
              </View>
            </View>

            <View style={{ flexDirection: "row", gap: 12 }}>
              <View style={{ flexDirection: "column", width: "50%" }}>
                <Text style={styles.inputLabel}>Initial Amount</Text>
                <View style={styles.amountInputContainer}>
                  <Text style={styles.currencyPrefix}>P</Text>
                  <TextInput
                    style={styles.amountInput}
                    placeholder=""
                    placeholderTextColor="#94A3B8"
                    keyboardType="numeric"
                    value={form.initial_amount}
                    onChangeText={(text) =>
                      handleInputChange("initial_amount", text)
                    }
                  />
                </View>
              </View>

              <View style={{ flexDirection: "column", width: "50%" }}>
                <Text style={styles.inputLabel}>Target Amount</Text>
                <View style={styles.amountInputContainer}>
                  <Text style={styles.currencyPrefix}>P</Text>
                  <TextInput
                    style={styles.amountInput}
                    placeholder=""
                    placeholderTextColor="#94A3B8"
                    keyboardType="numeric"
                    value={form.goal_amount}
                    onChangeText={(text) =>
                      handleInputChange("goal_amount", text)
                    }
                  />
                </View>
              </View>
            </View>

            <Text style={styles.inputLabel}>Account</Text>
            <DropdownInput
              label=""
              selectedValue={form.account}
              iconName="radio-button-on"
              options={accountNameList}
              onSelect={(text) => handleInputChange("account", text)}
              hasIcon={false}
            />

            <View style={styles.lowerSection}>
              <Text style={styles.inputLabel}>Theme Color</Text>
              <ColorPicker
                selectedColor={form.color}
                changeColor={(color) => handleInputChange("color", color)}
              />

              <TouchableOpacity
                style={[styles.saveBtn, { backgroundColor: form.color }]}
                onPress={handleSave}
              >
                <Text style={styles.saveBtnText}>
                  {isEdit ? "Edit" : "Create"} Goal
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
    height: 60,
    fontSize: 15,
    color: "#1E293B",
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
