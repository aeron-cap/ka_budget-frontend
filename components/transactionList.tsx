import TransactionDetailsModal from "@/app/modals/transaction";
import { useGetTransactions } from "@/hooks/useGetTransactions";
import { Transaction } from "@/types/transactions/transactions.type";
import { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import TransactionRow from "./transactionRow";

type transactionListProps = {
  limits: string;
  searchQuery?: string;
};

export default function TransactionList({
  limits,
  searchQuery,
}: transactionListProps) {
  const { data: transactions = [], isPending } = useGetTransactions(limits);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleTransactionPress = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalVisible(true);
  };

  const filteredTransactions = useMemo(() => {
    if (!searchQuery) return transactions;

    if (!transactions) return [];

    return transactions.filter(
      (t) =>
        t.note?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.transaction_category
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        t.transaction_account
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        t.receiving_account
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        t.amount.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.transaction_type.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [transactions, searchQuery]);

  if (isPending) {
    return <ActivityIndicator size="small" color="#000" />;
  }

  if (!transactions || transactions.length === 0) {
    return (
      <View style={style.emptyContainer}>
        <Text style={style.emptyText}>No Transactions available.</Text>
        <Text style={style.emptyHelperText}>
          Add one using the + button below.
        </Text>
      </View>
    );
  }

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setTimeout(() => {
      setSelectedTransaction(null);
    }, 300);
  };

  return (
    <View style={style.container}>
      {(filteredTransactions ?? []).map((t: Transaction) => {
        return (
          <TransactionRow
            key={t.id}
            transaction={t}
            onPress={() => handleTransactionPress(t)}
          />
        );
      })}

      <TransactionDetailsModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        transaction={selectedTransaction}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
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
  emptyHelperText: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
});
