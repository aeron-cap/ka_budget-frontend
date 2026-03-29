import TransactionDetailsModal from "@/app/modals/transaction";
import { transactions } from "@/constants/sampleData";
import { Transaction } from "@/types/transactions/transactions.type";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import TransactionRow from "./transactionRow";

type TransactionListProps = {
  transactions: Transaction[];
};

export default function TransactionList() {
  const transactionList = transactions;
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleTransactionPress = (transaction: any) => {
    setSelectedTransaction(transaction as Transaction);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setTimeout(() => {
      setSelectedTransaction(null);
    }, 300);
  };

  return (
    <View style={style.container}>
      {transactionList.slice(0, 3).map((t, idx) => {
        return (
          <TransactionRow
            key={idx}
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
});
