import { transactions } from "@/constants/sampleData";
import { Transaction } from "@/types/transactions/transactions.type";
import { FlatList, View } from "react-native";
import TransactionRow from "./transactionRow";

type TransactionListProps = {
  transactions: Transaction[];
};

export default function TransactionList() {
  const transactionList = transactions;
  return (
    <View>
      <FlatList
        data={transactionList}
        renderItem={({ item }) => <TransactionRow transaction={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
