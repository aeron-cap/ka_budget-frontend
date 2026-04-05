import DateAndFileInputs from "@/components/dateAndFileInput";
import DropdownInput from "@/components/dropdownInput";
import TransactionTypeSelector from "@/components/transactionTypeSelector";
import { categories } from "@/constants/categories";
import { ACCOUNTS } from "@/constants/sampleData";
import { Validator } from "@/helpers/helpers";
import { useCreateTransaction } from "@/hooks/useCreateTransaction";
import { useGetAccounts } from "@/hooks/useGetAccounts";
import { Transaction } from "@/types/transactions/transactions.type";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
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
  const { accountList, isFetching, refetch } = useGetAccounts("none");
  useFocusEffect(
    useCallback(() => {
      refetch();

      return () => {};
    }, [refetch]),
  );
  const accountNameList = useMemo(() => {
    return accountList.map((account) => account.name);
  }, [accountList]);
  const { processTransaction, isSubmitting } = useCreateTransaction();

  const [form, setForm] = useState<Transaction>({
    id: "",
    datetime: new Date(),
    transaction_category: "",
    amount: "0",
    note: "",
    transaction_type: "Income",
    transaction_account: accountNameList[0],
    receiving_account: accountNameList[0],
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
    console.log(errors);
    setIsValidTransaction(errors.length === 0);
  };

  const saveTransaction = () => {
    processTransaction(form as Transaction);
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 200 : 0}
      >
        <SafeAreaView
          edges={["top"]}
          style={[styles.header, { backgroundColor: activeColor }]}
        >
          <View style={styles.headerTopRow}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
              {id ? "Edit" : "New"} Transaction
            </Text>
            <View style={{ width: 40 }} />
          </View>

          <Text style={styles.howMuchText}>How much?</Text>

          <View style={styles.amountContainer}>
            <TextInput
              style={styles.amountInput}
              value={form.amount}
              onChangeText={(text) => handleInputChange("amount", text)}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor="rgba(255,255,255,0.6)"
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
        >
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              gap: 12,
            }}
          >
            <View style={{ flex: 1 }}>
              <DropdownInput
                label="Category"
                selectedValue={form.transaction_category}
                iconName="radio-button-on"
                options={categories}
                onSelect={(text) =>
                  handleInputChange("transaction_category", text)
                }
                hasIcon={false}
              />
            </View>

            {form.transaction_type === "Transfer" && (
              <View style={{ flex: 1 }}>
                <DropdownInput
                  label="Receiving Category"
                  selectedValue={form.receiving_category ?? ""}
                  iconName="radio-button-on"
                  options={categories}
                  onSelect={(text) =>
                    handleInputChange("receiving_category", text)
                  }
                  hasIcon={false}
                />
              </View>
            )}
          </View>

          <View
            style={{
              flexDirection: "row",
              width: "100%",
              gap: 12,
            }}
          >
            <View style={{ flex: 1 }}>
              <DropdownInput
                label="Account"
                selectedValue={form.transaction_account}
                iconName="trending-up"
                options={accountNameList}
                onSelect={(text) =>
                  handleInputChange("transaction_account", text)
                }
                hasIcon={false}
              />
            </View>

            {form.transaction_type === "Transfer" && (
              <View style={{ flex: 1 }}>
                <DropdownInput
                  label="Receiving Account"
                  selectedValue={form?.receiving_account ?? ACCOUNTS[0].name}
                  iconName="trending-down"
                  options={accountNameList}
                  onSelect={(text) =>
                    handleInputChange("receiving_account", text)
                  }
                  hasIcon={false}
                />
              </View>
            )}
          </View>

          <View
            style={{
              flexDirection: "row",
              width: "100%",
              gap: 12,
            }}
          >
            <View style={{ flex: 1 }}>
              <DateAndFileInputs
                selectedDate={form.datetime}
                onSelect={(text) => handleInputChange("datetime", text)}
                styleType={form.transaction_type}
              />
            </View>

            {form.transaction_type === "Transfer" && (
              <View style={{ flex: 1 }}>
                <View style={styles.transferFeeInput}>
                  <Text style={styles.inputLabel}>Transfer Fee</Text>
                  <View style={styles.amountInputContainer}>
                    <TextInput
                      style={styles.feeInput}
                      placeholder="0"
                      placeholderTextColor="#94A3B8"
                      keyboardType="numeric"
                      value={form.fee ?? "0"}
                      onChangeText={(text) => handleInputChange("fee", text)}
                    />
                  </View>
                </View>
              </View>
            )}
          </View>

          <View style={styles.noteContainer}>
            <TextInput
              style={styles.noteInput}
              placeholder="Add note..."
              placeholderTextColor="#94A3B8"
              multiline
              value={form.note ?? ""}
              onChangeText={(text) => handleInputChange("note", text)}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.saveButton,
              isValidTransaction
                ? { backgroundColor: "#2B60E9" }
                : { backgroundColor: "gray" },
            ]}
            activeOpacity={0.8}
            onPress={() => saveTransaction()}
            disabled={!isValidTransaction}
          >
            <Ionicons
              name="checkmark"
              size={20}
              color="white"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.saveButtonText}>Save Transaction</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 60,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  headerTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 32,
    paddingTop: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
  howMuchText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 8,
  },
  amountContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  currencySymbol: {
    color: "white",
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 10,
    marginRight: 8,
  },
  amountInput: {
    fontSize: 48,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
    textAlignVertical: "center",
    width: "100%",
  },
  feeInput: {
    fontSize: 12,
    fontWeight: "800",
    color: "black",
    width: "100%",
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  noteContainer: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 20,
    minHeight: 120,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  noteInput: {
    fontSize: 15,
    color: "#1E293B",
    textAlignVertical: "top",
  },
  saveButton: {
    flexDirection: "row",
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    shadowColor: "#2B60E9",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  keyboardAvoid: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
  },
  inputLabel: {
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: "500",
    marginBottom: 4,
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
  amountInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 40,
  },
  currencyPrefix: {
    fontSize: 15,
    color: "#64748B",
    fontWeight: "600",
    marginRight: 8,
  },
  transferFeeInput: {
    padding: 12,
    backgroundColor: "white",
    elevation: 1,
    marginBottom: 16,
    borderRadius: 24,
  },
});
