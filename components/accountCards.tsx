import { Account } from "@/types/accounts/accounts.type";
import { Ionicons } from "@expo/vector-icons";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type AccountCardProps = {
  accountData: Account;
  onPress: (x: Account) => void;
};

const getAccountIcon = (type: string) => {
  switch (type) {
    case "Bank":
      return "business-outline";
    case "Online Bank":
      return "globe-outline";
    case "Credit":
      return "card-outline";
    case "Investments":
      return "trending-up-outline";
    case "Cash":
      return "cash-outline";
    default:
      return "wallet-outline";
  }
};

export default function AccountCard({
  accountData,
  onPress,
}: AccountCardProps) {
  return (
    <TouchableOpacity
      style={styles.accountCard}
      onPress={() => onPress(accountData)}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Ionicons
          name={getAccountIcon(accountData.account_type)}
          size={20}
          color={accountData.color || "#2563EB"}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text
          style={[styles.accountName, { color: accountData.color || "black" }]}
          numberOfLines={1}
        >
          {accountData.name}
        </Text>
        <Text style={styles.accountType}>{accountData.account_type}</Text>
      </View>

      <Text style={styles.balanceText}>
        {parseFloat(accountData.current_balance || "0").toLocaleString(
          "en-US",
          {
            style: "currency",
            currency: "PHP",
            minimumFractionDigits: 2,
          },
        )}
      </Text>
    </TouchableOpacity>
  );
}

const screenWidth = Dimensions.get("window").width;
const cardWidth = (screenWidth - 48 - 12) / 2;

const styles = StyleSheet.create({
  accountCard: {
    width: cardWidth,
    height: 160,
    backgroundColor: "white",
    borderRadius: 24,
    padding: 16,
    marginBottom: 12,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "rgba(43, 96, 233, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    marginTop: 8,
  },
  accountName: {
    fontSize: 15,
    fontWeight: "600",
  },
  accountType: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 2,
  },
  balanceText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
    marginTop: "auto",
  },
});
