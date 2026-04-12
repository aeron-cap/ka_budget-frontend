import AddAccount from "@/app/modals/addAccount";
import { useCreateAccount } from "@/hooks/useCreateAccount";
import { useGetAccounts } from "@/hooks/useGetAccounts";
import { Account } from "@/types/accounts/accounts.type";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import AccountCard from "./accountCards";

type accountListProps = {
  limits: string;
};

export default function AccountsSection({ limits }: accountListProps) {
  const { data: accounts = [], isPending: isFetching } = useGetAccounts(limits);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentAccount, setCurrentAccount] = useState<Account | null>(null);
  const { mutate: processAccount, isPending } = useCreateAccount();

  const handleSaveAccount = (accountData: Account) => {
    processAccount(accountData, {
      onSuccess: () => {
        setIsModalVisible(false);
      },
    });
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
    return <ActivityIndicator size="small" color="#FFFFFF" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>My Accounts</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handleCreateNewAccount()}
        >
          <LinearGradient
            colors={["#1C1816", "#67412e"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.addButton}
          >
            <Ionicons name="add" size={24} color="#FFFFFF" />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {accounts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No Accounts available.</Text>
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {accounts.map((account) => {
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

      <AddAccount
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
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 24,
    color: "#FFFFFF",
  },
  addButton: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 120,
  },
  emptyText: {
    fontFamily: "PlayfairDisplay_400Regular",
    fontSize: 16,
    color: "#78716C",
    textAlign: "center",
  },
});
