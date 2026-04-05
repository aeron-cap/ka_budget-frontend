import TransactionDetailsModal from "@/app/modals/transaction";
import { useGetTransactions } from "@/hooks/useGetTransactions";
import { Transaction } from "@/types/transactions/transactions.type";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import TransactionRow from "./transactionRow";

type transactionListProps = {
  limits: string;
};

export default function TransactionList({ limits }: transactionListProps) {
  const { transactionList, isFetching, refetch } = useGetTransactions(limits);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      refetch();

      return () => {};
    }, [refetch]),
  );

  const handleTransactionPress = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalVisible(true);
  };

  if (isFetching) {
    return <ActivityIndicator size="small" color="#000" />;
  }

  if (transactionList.length === 0) {
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
      refetch();
    }, 300);
  };

  return (
    <View style={style.container}>
      {(transactionList ?? []).map((t: Transaction) => {
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
