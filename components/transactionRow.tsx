import { Ionicons } from "@expo/vector-icons"; // Ensure you have this installed
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TransactionRow({ transaction }: { transaction: any }) {
  const isIncome = transaction.transaction_type_name === "Income";

  const formattedDate = new Date(transaction.dateTime).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
    },
  );

  return (
    <TouchableOpacity style={style.touchContainer} activeOpacity={0.7}>
      <View
        style={[
          style.iconBackground,
          { backgroundColor: isIncome ? "#ECFDF5" : "#FFF1F2" },
        ]}
      >
        <Ionicons
          name={isIncome ? "briefcase" : "cafe"}
          size={24}
          color={isIncome ? "#10B981" : "#F43F5E"}
        />
      </View>

      <View style={style.infoSection}>
        <Text style={style.nameText} numberOfLines={1}>
          {transaction.transaction_name}
        </Text>
        <Text style={style.subText}>
          {transaction.transaction_category_name} • {formattedDate}
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
          {transaction.amount.toFixed(2)}
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
    elevation: 3,
  },
  iconBackground: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  infoSection: {
    flex: 1,
    marginLeft: 16,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
  },
  subText: {
    fontSize: 13,
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
