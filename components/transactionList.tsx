import { transactions } from "@/constants/sampleData";
import { Transaction } from "@/types/transactions/transactions.type";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import TransactionRow from "./transactionRow";

type TransactionListProps = {
  transactions: Transaction[];
};

// TODO: Max of 5 transactions for Home and Lazy Load for history
export default function TransactionList() {
  const transactionList = transactions;

  const handleTransactionPress = (transaction: any) => {
    router.push({
      pathname: "/modals/add",
      params: {
        id: transaction.id,
        data: JSON.stringify(transaction),
      },
    });
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
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
