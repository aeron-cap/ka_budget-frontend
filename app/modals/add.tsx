import DateAndFileInputs from "@/components/dateAndFileInput";
import DropdownInput from "@/components/dropdownInput";
import TransactionTypeSelector from "@/components/transactionTypeSelector";
import { categories } from "@/constants/categories";
import { Validator } from "@/helpers/helpers";
import { useCreateTransaction } from "@/hooks/useCreateTransaction";
import { useGetAccounts } from "@/hooks/useGetAccounts";
import { Transaction } from "@/types/transactions/transactions.type";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const THEME_COLORS = {
  Expense: "#FD3C4A",
  Income: "#00A86B",
  Transfer: "#2B60E9",
};

type TransactionType = keyof typeof THEME_COLORS;

export default function AddModal() {
  const { id, data } = useLocalSearchParams<{ id?: string; data?: string }>();
  const [isEdit, setIsEdit] = useState(id ? true : false);
  const [activeColor, setActiveColor] = useState(THEME_COLORS.Income);
  const [isValidTransaction, setIsValidTransaction] = useState(
    id ? true : false,
  );
  const { data: accounts = [], isPending } = useGetAccounts("none");

  const accountNameList = useMemo(() => {
    return accounts.map((account) => account.name);
  }, [accounts]);

  const { mutate: processTransaction, isPending: isPendingSaving } =
    useCreateTransaction();

  const [form, setForm] = useState<Transaction>({
    id: "",
    datetime: new Date(),
    transaction_category: "",
    amount: "0",
    note: "",
    transaction_type: "Income",
    transaction_account: accountNameList[0] || "",
    receiving_account: accountNameList[0] || "",
    receiving_category: "",
    saving_name: "",
    fee: "0",
  });

  useEffect(() => {
    const parsedData: Transaction | null = data ? JSON.parse(data) : null;

    const type = (parsedData?.transaction_type ??
      "Income") as keyof typeof THEME_COLORS;
    const color = THEME_COLORS[type] ?? THEME_COLORS.Income;

    setActiveColor(color);
    setForm({
      id: parsedData?.id ?? "",
      datetime: parsedData?.datetime
        ? new Date(parsedData.datetime)
        : new Date(),
      transaction_category: parsedData?.transaction_category ?? "",
      amount: parsedData?.amount ?? "0",
      note: parsedData?.note ?? "",
      transaction_type: parsedData?.transaction_type ?? "Income",
      transaction_account:
        parsedData?.transaction_account ?? accountNameList[0],
      receiving_account: parsedData?.receiving_account ?? "",
      receiving_category: parsedData?.receiving_category ?? "",
      saving_name: parsedData?.saving_name ?? "",
      fee: parsedData?.fee ?? "0",
    });
  }, [id, data, isEdit, accountNameList]);

  const handleInputChange = (name: keyof typeof form, value: string | Date) => {
    const nextForm = {
      ...form,
      [name]: value,
    };

    setForm(nextForm);

    if (name === "transaction_type") {
      const color =
        THEME_COLORS[value as TransactionType] ?? THEME_COLORS.Expense;
      setActiveColor(color);
    }

    const { errors } = Validator(nextForm, "Transaction");
    setIsValidTransaction(errors.length === 0);
  };

  const saveTransaction = () => {
    processTransaction(form, {
      onSuccess: () => {
        router.back();
      },
    });
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <SafeAreaView edges={["top"]} style={styles.header}>
          <View style={styles.headerTopRow}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
              {id ? "Edit" : "New"} Transaction
            </Text>
            <View style={{ width: 36 }} />
          </View>

          <Text style={styles.howMuchText}>How much?</Text>

          <View style={styles.amountContainer}>
            <TextInput
              style={[styles.amountInput, { color: activeColor }]}
              value={form.amount}
              onChangeText={(text) => handleInputChange("amount", text)}
              keyboardType="numeric"
              placeholder="0.00"
              placeholderTextColor="#78716C"
              selectionColor="#FFFFFF"
            />
          </View>
        </SafeAreaView>

        <TransactionTypeSelector
          selectedType={form.transaction_type as TransactionType}
          onSelect={(text) => handleInputChange("transaction_type", text)}
          activeColor={activeColor}
        />

        <ScrollView
          style={styles.formContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
        >
          <View style={styles.row}>
            <View style={styles.flexItem}>
              <Text style={styles.inputLabel}>Category</Text>
              <DropdownInput
                label=""
                selectedValue={form.transaction_category}
                iconName="grid-outline"
                options={categories}
                onSelect={(text) =>
                  handleInputChange("transaction_category", text)
                }
                hasIcon={false}
              />
            </View>

            {form.transaction_type === "Transfer" && (
              <View style={styles.flexItem}>
                <Text style={styles.inputLabel}>Receiving Category</Text>
                <DropdownInput
                  label=""
                  selectedValue={form.receiving_category ?? ""}
                  iconName="grid-outline"
                  options={categories}
                  onSelect={(text) =>
                    handleInputChange("receiving_category", text)
                  }
                  hasIcon={false}
                />
              </View>
            )}
          </View>

          <View style={styles.row}>
            <View style={styles.flexItem}>
              <Text style={styles.inputLabel}>Account</Text>
              <DropdownInput
                label=""
                selectedValue={form.transaction_account}
                iconName="wallet-outline"
                options={accountNameList}
                onSelect={(text) =>
                  handleInputChange("transaction_account", text)
                }
                hasIcon={false}
              />
            </View>

            {form.transaction_type === "Transfer" && (
              <View style={styles.flexItem}>
                <Text style={styles.inputLabel}>Receiving Account</Text>
                <DropdownInput
                  label=""
                  selectedValue={form?.receiving_account ?? accountNameList[0]}
                  iconName="wallet-outline"
                  options={accountNameList}
                  onSelect={(text) =>
                    handleInputChange("receiving_account", text)
                  }
                  hasIcon={false}
                />
              </View>
            )}
          </View>

          <View style={styles.row}>
            <View style={styles.flexItem}>
              <Text style={styles.inputLabel}>Date</Text>
              <DateAndFileInputs
                selectedDate={form.datetime}
                onSelect={(text) => handleInputChange("datetime", text)}
                styleType={form.transaction_type}
              />
            </View>

            {form.transaction_type === "Transfer" && (
              <View style={styles.flexItem}>
                <Text style={styles.inputLabel}>Transfer Fee</Text>
                <View style={styles.amountInputContainer}>
                  <TextInput
                    style={styles.feeInput}
                    placeholder="0.00"
                    placeholderTextColor="#78716C"
                    keyboardType="numeric"
                    value={form.fee ?? "0"}
                    onChangeText={(text) => handleInputChange("fee", text)}
                    selectionColor="#FFFFFF"
                  />
                </View>
              </View>
            )}
          </View>

          <Text style={styles.inputLabel}>Note</Text>
          <TextInput
            style={styles.noteInput}
            placeholder="Add note..."
            placeholderTextColor="#78716C"
            multiline
            value={form.note ?? ""}
            onChangeText={(text) => handleInputChange("note", text)}
            selectionColor="#FFFFFF"
          />

          <TouchableOpacity
            style={[
              styles.saveBtn,
              {
                backgroundColor: isValidTransaction
                  ? activeColor
                  : "rgba(255, 255, 255, 0.1)",
              },
            ]}
            activeOpacity={0.9}
            onPress={saveTransaction}
            disabled={!isValidTransaction}
          >
            <Text
              style={[
                styles.saveBtnText,
                !isValidTransaction && styles.saveBtnTextDisabled,
                isValidTransaction && {
                  color: activeColor === "#FFFFFF" ? "#1C1816" : "#FFFFFF",
                },
              ]}
            >
              {isEdit ? "Edit" : "Save"} Transaction
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1816",
  },
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    backgroundColor: "#1C1816",
  },
  headerTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
    paddingTop: 16,
  },
  closeButton: {
    width: 36,
    height: 36,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 24,
    color: "#FFFFFF",
  },
  howMuchText: {
    fontFamily: "PlayfairDisplay_400Regular",
    fontSize: 16,
    color: "#A39B95",
    textAlign: "center",
    marginBottom: 8,
  },
  amountContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 80,
  },
  amountInput: {
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 48,
    color: "#FFFFFF",
    textAlign: "center",
    textAlignVertical: "center",
    width: "100%",
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
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
  amountInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    paddingHorizontal: 16,
    height: 60,
  },
  feeInput: {
    flex: 1,
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 18,
    color: "#FFFFFF",
  },
  noteInput: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    paddingHorizontal: 16,
    paddingVertical: 16,
    minHeight: 120,
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 14,
    color: "#FFFFFF",
    textAlignVertical: "top",
  },
  saveBtn: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
    marginBottom: 60,
  },
  saveBtnText: {
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 18,
  },
  saveBtnTextDisabled: {
    color: "#78716C",
  },
});
