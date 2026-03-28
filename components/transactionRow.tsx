import { Transaction } from "@/types/transactions/transactions.type";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface TransactionRowProps {
  transaction: Transaction;
  onPress: () => void;
}

export default function TransactionRow({
  transaction,
  onPress,
}: TransactionRowProps) {
  const isIncome = transaction.transaction_type === "Income";
  const dateObj = new Date(transaction.datetime);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(dateObj);

  const formattedTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(dateObj);

  const dateTime = formattedDate + " " + formattedTime;

  return (
    <TouchableOpacity
      style={style.touchContainer}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View
        style={[
          style.iconBackground,
          { backgroundColor: isIncome ? "#ECFDF5" : "#FFF1F2" },
        ]}
      >
        <Ionicons
          name={transaction.icon}
          size={22}
          color={isIncome ? "#10B981" : "#F43F5E"}
        />
      </View>

      <View style={style.infoSection}>
        <Text style={style.nameText} numberOfLines={1}>
          {transaction.note ?? ""}
        </Text>
        <Text style={style.subText}>
          {transaction.transaction_category} • {dateTime}
        </Text>
      </View>

      <View style={style.amountSection}>
        <Text
          style={[
            style.amountText,
            { color: isIncome ? "#10B981" : "#1E293B" },
          ]}
        >
          {isIncome ? "+" : "-"}
          {transaction.amount}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  touchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  iconBackground: {
    width: 40,
    height: 40,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  infoSection: {
    flex: 1,
    marginLeft: 10,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
  },
  subText: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 2,
  },
  amountSection: {
    alignItems: "flex-end",
  },
  amountText: {
    fontSize: 16,
    fontWeight: "800",
  },
});
