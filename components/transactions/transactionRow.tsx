import { Transaction } from "@/types/transactions/transactions.type";
import { Text, TouchableOpacity } from "react-native";

type TransactionProps = {
  transaction: Transaction;
};

export default function TransactionRow({ transaction }: TransactionProps) {
  return (
    <TouchableOpacity>
      <Text>{transaction.transaction_name}</Text>
    </TouchableOpacity>
  );
}
