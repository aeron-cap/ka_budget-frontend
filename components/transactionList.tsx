import { Transaction } from "@/types/transactions/transactions.type";
import { FlatList, View } from "react-native";
import TransactionRow from "./transactionRow";

type TransactionListProps = {
  transactions: Transaction[];
  styles: object;
};

export default function TransactionList({
  transactions,
  styles,
}: TransactionListProps) {
  return (
    <View style={styles}>
      <FlatList
        data={transactions}
        renderItem={({ item }) => <TransactionRow transaction={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
