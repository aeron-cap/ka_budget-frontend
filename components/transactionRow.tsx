import { categoryIconsAndTypes } from "@/constants/uiElements";
import { Transaction } from "@/types/transactions/transactions.type";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface TransactionRowProps {
  transaction: Transaction;
  onPress: () => void;
}

const transactionColors = {
  Income: {
    bg: "#ECFDF5",
    icon: "#34D399",
    text: "#065F46",
  },
  Expense: {
    bg: "#FEF3F2",
    icon: "#F87171",
    text: "#B91C1C",
  },
  Transfer: {
    bg: "#EFF6FF",
    icon: "#60A5FA",
    text: "#1E40AF",
  },
};

export default function TransactionRow({
  transaction,
  onPress,
}: TransactionRowProps) {
  const dateObj = new Date(transaction.datetime);
  const type = transaction.transaction_type as keyof typeof transactionColors;
  const bgColor = transactionColors[type].bg || "#F1F5F9";
  const iconColor = transactionColors[type].icon || "#94A3B8";
  const textColor = transactionColors[type].text || "#1E293B";

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(dateObj);

  const formattedTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(dateObj);

  const dateTime = formattedDate + " " + formattedTime;

  const getIcon = (name: string) => {
    if (name in categoryIconsAndTypes) {
      return categoryIconsAndTypes[name].icon;
    }

    return "wallet-outline";
  };

  return (
    <TouchableOpacity
      style={style.touchContainer}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={[style.iconBackground, { backgroundColor: bgColor }]}>
        <Ionicons
          name={getIcon(transaction.transaction_category)}
          size={22}
          color={iconColor}
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
        <Text style={[style.amountText, { color: textColor }]}>
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
    borderRadius: 12,
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
