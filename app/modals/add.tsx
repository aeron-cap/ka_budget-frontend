import DateAndFileInputs from "@/components/dateAndFileInput";
import DropdownInput from "@/components/dropdownInput";
import TransactionTypeSelector from "@/components/transactionTypeSelector";
import { Transaction } from "@/types/transactions/transactions.type";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
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

const CATEGORIES = [
  "Food & Dining",
  "Shopping",
  "Transport",
  "Salary",
  "Entertainment",
];

const ACCOUNTS = [
  "Credit Card (**** 9012)",
  "Main Checking",
  "Savings",
  "Cash",
];

export default function AddModal() {
  const { id, data } = useLocalSearchParams<{ id?: string; data?: string }>();

  const initialData: Transaction | null = data ? JSON.parse(data) : null;

  const [type, setType] = useState<TransactionType>(
    initialData ? (initialData.transaction_type as TransactionType) : "Income",
  );
  const [amount, setAmount] = useState<string>(
    initialData ? JSON.stringify(initialData.amount) : "0",
  );
  const [category, setCategory] = useState<string>(
    initialData ? initialData.transaction_category : CATEGORIES[0],
  );
  const [account, setAccount] = useState<string>(
    initialData ? initialData.account : ACCOUNTS[0],
  );
  const [date, setDate] = useState<Date>(
    initialData ? new Date(initialData.datetime) : new Date(),
  );
  const [note, setNote] = useState<string>(initialData ? initialData.note : "");

  const activeColor = THEME_COLORS[type];

  const saveTransaction = () => {
    console.log(amount, category, account, date);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
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
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor="rgba(255,255,255,0.6)"
            />
          </View>
        </SafeAreaView>

        <TransactionTypeSelector
          selectedType={type}
          onSelect={setType}
          activeColor={activeColor}
        />

        <ScrollView
          style={styles.formContainer}
          showsVerticalScrollIndicator={false}
        >
          <DropdownInput
            label="Category"
            selectedValue={category}
            iconName="radio-button-on"
            options={CATEGORIES}
            onSelect={setCategory}
          />

          <DropdownInput
            label="Account"
            selectedValue={account}
            iconName="trending-up"
            options={ACCOUNTS}
            onSelect={setAccount}
          />

          <DateAndFileInputs selectedDate={date} onSelect={setDate} />

          <View style={styles.noteContainer}>
            <TextInput
              style={styles.noteInput}
              placeholder="Add note..."
              placeholderTextColor="#94A3B8"
              multiline
              value={note}
            />
          </View>

          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: "#2B60E9" }]}
            activeOpacity={0.8}
            onPress={() => saveTransaction()}
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
      </View>
    </KeyboardAvoidingView>
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
    left: 4,
  },
  currencySymbol: {
    color: "white",
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 10,
    marginRight: 8,
  },
  amountInput: {
    color: "white",
    fontSize: 64,
    fontWeight: "800",
    minWidth: 100,
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
});
