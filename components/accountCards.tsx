import { accountTypeIcons } from "@/constants/uiElements";
import { getGradientColors } from "@/helpers/helpers";
import { Account } from "@/types/accounts/accounts.type";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
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
  if (type in accountTypeIcons) {
    return accountTypeIcons[type as keyof typeof accountTypeIcons];
  }

  return "wallet-outline";
};

const getProviderGradient = (account_type: string, provider: string) => {
  return getGradientColors(account_type, provider);
};

export default function AccountCard({
  accountData,
  onPress,
}: AccountCardProps) {
  return (
    <TouchableOpacity onPress={() => onPress(accountData)} activeOpacity={0.9}>
      <LinearGradient
        colors={getProviderGradient(
          accountData.account_type || "",
          accountData.provider || "",
        )}
        start={{ x: -1.5, y: 0 }}
        end={{ x: 1.5, y: 1 }}
        style={styles.accountCard}
      >
        <View style={styles.iconContainer}>
          <Ionicons
            name={getAccountIcon(accountData.account_type)}
            size={32}
            color={accountData.color || "#FFFFFF"}
          />
        </View>

        <View style={styles.infoContainer}>
          <Text
            style={[styles.accountName, { color: "#FFFFFF" }]}
            numberOfLines={1}
          >
            {accountData.name}
          </Text>
          <Text style={[styles.accountType, { color: "#FFFFFF" }]}>
            {accountData.account_type} - {accountData.provider}
          </Text>
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
      </LinearGradient>
    </TouchableOpacity>
  );
}

const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth * 0.7;

const styles = StyleSheet.create({
  accountCard: {
    width: cardWidth,
    height: 160,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: 16,
    justifyContent: "space-between",
    borderRadius: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    marginTop: 8,
  },
  accountName: {
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 18,
  },
  accountType: {
    fontFamily: "PlayfairDisplay_400Regular",
    fontSize: 16,
    color: "#78716C",
    marginTop: 4,
  },
  balanceText: {
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 18,
    color: "#FFFFFF",
    marginTop: "auto",
  },
});
