import AddAccountModal from "@/app/modals/addAccount";
import { ACCOUNTS } from "@/constants/sampleData";
import { useCreateAccount } from "@/hooks/useCreateAccount";
import { useGetAccounts } from "@/hooks/useGetAccounts";
import { Account } from "@/types/accounts/accounts.type";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import AccountCard from "./accountCards";

const SAMPLE_ACCOUNTS: Account[] = ACCOUNTS;

type accountListProps = {
  limits: string;
};

export default function AccountsSection({ limits }: accountListProps) {
  const { accountList, isFetching, refetch } = useGetAccounts(limits);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentAccount, setCurrentAccount] = useState<Account | null>(null);
  const { processAccount, isSubmitting } = useCreateAccount();

  useFocusEffect(
    useCallback(() => {
      refetch();

      return () => {};
    }, [refetch]),
  );

  const handleSaveAccount = (accountData: Account) => {
    processAccount(accountData);
    setIsModalVisible(false);
    refetch();
  };

  const handleAccountView = (accountData: Account) => {
    setCurrentAccount(accountData);
    setIsModalVisible(true);
  };

  const handleCreateNewAccount = () => {
    setCurrentAccount(null);
    setIsModalVisible(true);
  };

  if (isFetching) {
    return <ActivityIndicator size="small" color="#000" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>My Accounts</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleCreateNewAccount()}
        >
          <Ionicons name="add" size={20} color="#2563EB" />
        </TouchableOpacity>
      </View>

      {accountList.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No Accounts available.</Text>
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {accountList.map((account) => {
            return (
              <View key={account.id}>
                <AccountCard
                  accountData={account}
                  onPress={handleAccountView}
                />
              </View>
            );
          })}
        </ScrollView>
      )}

      <AddAccountModal
        isVisible={isModalVisible}
        isEdit={currentAccount ? true : false}
        onClose={() => setIsModalVisible(false)}
        onSave={handleSaveAccount}
        accountData={currentAccount}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#DBEAFE",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 16,
  },
  accountCard: {
    backgroundColor: "#17202A",
    width: 160,
    height: 160,
    borderRadius: 24,
    padding: 20,
    justifyContent: "space-between",
  },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  accountNumber: {
    color: "#94A3B8",
    fontSize: 13,
  },
  cardBottom: {},
  accountLabel: {
    color: "#94A3B8",
    fontSize: 12,
    marginBottom: 4,
  },
  accountBalance: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },
});
