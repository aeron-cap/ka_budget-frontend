import { categoryIconsAndTypes } from "@/constants/uiElements";
import { Transaction } from "@/types/transactions/transactions.type";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface TransactionRowProps {
  transaction: Transaction;
  onPress: () => void;
}

const transactionColors = {
  Income: "#00A86B",
  Expense: "#FD3C4A",
  Transfer: "#2B60E9",
};

export default function TransactionRow({
  transaction,
  onPress,
}: TransactionRowProps) {
  const dateObj = new Date(transaction.datetime);
  const type = transaction.transaction_type as keyof typeof transactionColors;
  const typeColor = transactionColors[type] || "#FFFFFF";

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "numeric",
    day: "2-digit",
  }).format(dateObj);

  const formattedTime = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(dateObj);

  const dateTime = formattedDate + " " + formattedTime;

  const getIcon = (name: string) => {
    if (name in categoryIconsAndTypes) {
      return categoryIconsAndTypes[name as keyof typeof categoryIconsAndTypes]
        .icon;
    }

    return "wallet-outline";
  };

  return (
    <TouchableOpacity
      style={style.touchContainer}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={style.iconBackground}>
        <Ionicons
          name={getIcon(transaction.transaction_category)}
          size={24}
          color={typeColor}
        />
      </View>

      <View style={style.infoSection}>
        <Text style={style.nameText} numberOfLines={1}>
          {transaction.note || transaction.transaction_category}
        </Text>
        <Text style={style.subText}>
          {transaction.transaction_account} • {dateTime}
        </Text>
      </View>

      <View style={style.amountSection}>
        <Text style={[style.amountText, { color: typeColor }]}>
          {type === "Expense" ? "-" : "+"}
          {parseFloat(transaction.amount).toLocaleString("en-US", {
            style: "currency",
            currency: "PHP",
            minimumFractionDigits: 2,
          })}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  touchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: 16,
    marginBottom: 12,
  },
  iconBackground: {
    width: 48,
    height: 48,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
  },
  infoSection: {
    flex: 1,
    marginLeft: 16,
  },
  nameText: {
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 18,
    color: "#FFFFFF",
  },
  subText: {
    fontSize: 12,
    color: "#78716C",
    marginTop: 4,
  },
  amountSection: {
    alignItems: "flex-end",
  },
  amountText: {
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 18,
  },
});
