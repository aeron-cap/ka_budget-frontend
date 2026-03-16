import { transactions } from "@/constants/sampleData";
import { Transaction } from "@/types/transactions/transactions.type";
import { StyleSheet, Text, View } from "react-native";
import TransactionRow from "./transactionRow";

type TransactionListProps = {
  transactions: Transaction[];
};

// Max of 5 transactions
export default function TransactionList() {
  const transactionList = transactions;
  return (
    <View style={style.container}>
      <View style={style.headerContainer}>
        <Text style={style.headerText}>Recent Transactions</Text>
        <Text>See more</Text>
      </View>

      {transactionList.map((t, idx) => {
        return <TransactionRow key={idx} transaction={t} />;
      })}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    height: 600,
  },
  headerContainer: {
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  transactionsContainer: {
    gap: 12,
  },
});
