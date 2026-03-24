import TransactionDetailsModal, {
  TransactionDetails,
} from "@/app/modals/transaction";
import { transactions } from "@/constants/sampleData";
import { Transaction } from "@/types/transactions/transactions.type";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import TransactionRow from "./transactionRow";

type TransactionListProps = {
  transactions: Transaction[];
};

// TODO: Max of 5 transactions for Home and Lazy Load for history
export default function TransactionList() {
  const transactionList = transactions;
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionDetails | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleTransactionPress = (transaction: any) => {
    setSelectedTransaction(transaction as TransactionDetails);
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
      {transactionList.map((t, idx) => {
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
