import { categoryIconsAndTypes } from "@/constants/uiElements";
import { useDeleteTransaction } from "@/hooks/useDeleteTransaction";
import { Transaction } from "@/types/transactions/transactions.type";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface TransactionDetailsModalProps {
  isVisible: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

const transactionColors = {
  Income: "#00A86B",
  Expense: "#FD3C4A",
  Transfer: "#2B60E9",
};

export default function TransactionDetailsModal({
  isVisible,
  onClose,
  transaction,
}: TransactionDetailsModalProps) {
  const [renderModal, setRenderModal] = useState(isVisible);
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { mutate: deleteTransaction, isPending } = useDeleteTransaction();

  useEffect(() => {
    if (isVisible) {
      setRenderModal(true);
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: SCREEN_HEIGHT,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => setRenderModal(false));
    }
  }, [isVisible, slideAnim, fadeAnim]);

  if (!renderModal || !transaction) return null;

  const isIncome = transaction.transaction_type === "Income";
  const amountPrefix = isIncome ? "+" : "-";
  const typeColor =
    transactionColors[
      transaction.transaction_type as keyof typeof transactionColors
    ] || "#FFFFFF";

  const dateObj = new Date(transaction.datetime);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(dateObj);

  const formattedTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(dateObj);

  const dateTime = formattedDate + " " + formattedTime;

  const editTransaction = () => {
    onClose();

    router.push({
      pathname: "/modals/add",
      params: {
        id: transaction.id,
        data: JSON.stringify(transaction),
      },
    });
  };

  const voidTransaction = () => {
    deleteTransaction(transaction, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const getIcon = (name: string) => {
    if (name in categoryIconsAndTypes) {
      return categoryIconsAndTypes[name as keyof typeof categoryIconsAndTypes]
        .icon;
    }

    return "cash-outline";
  };

  return (
    <Modal
      visible={renderModal}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <View style={styles.modalWrapper}>
        <Animated.View
          style={[
            styles.modalContent,
            { transform: [{ translateY: slideAnim }], opacity: fadeAnim },
          ]}
        >
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
              activeOpacity={0.9}
            >
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.headerInfo}>
            <View style={styles.iconContainer}>
              <Ionicons
                name={getIcon(transaction.transaction_category)}
                size={40}
                color={typeColor}
              />
            </View>
            <Text style={[styles.amountText, { color: typeColor }]}>
              {amountPrefix}
              {parseFloat(transaction.amount).toLocaleString("en-US", {
                style: "currency",
                currency: "PHP",
                minimumFractionDigits: 2,
              })}
            </Text>
            <Text style={styles.payeeText}>
              {transaction.note || transaction.transaction_category}
            </Text>
          </View>

          <View style={styles.detailsCard}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Date</Text>
              <Text style={styles.detailValue}>{dateTime}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Category</Text>
              <Text style={styles.detailValue}>
                {transaction.transaction_category}
              </Text>
            </View>

            <View style={[styles.detailRow, styles.lastDetailRow]}>
              <Text style={styles.detailLabel}>Account</Text>
              <Text style={styles.detailValue}>
                {transaction.transaction_account}
              </Text>
            </View>
          </View>

          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity
              style={styles.voidButton}
              activeOpacity={0.9}
              onPress={() => voidTransaction()}
            >
              <Text style={styles.voidButtonText}>Void</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editButton}
              activeOpacity={0.9}
              onPress={() => editTransaction()}
            >
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#1C1816",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
  headerContainer: {
    alignItems: "flex-end",
    marginBottom: 24,
  },
  closeButton: {
    width: 36,
    height: 36,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerInfo: {
    alignItems: "center",
    marginBottom: 32,
  },
  iconContainer: {
    width: 80,
    height: 80,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  amountText: {
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 40,
    marginBottom: 8,
  },
  payeeText: {
    fontFamily: "PlayfairDisplay_400Regular",
    fontSize: 18,
    color: "#A39B95",
  },
  detailsCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: 24,
    marginBottom: 32,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  lastDetailRow: {
    paddingBottom: 0,
  },
  detailLabel: {
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 16,
    color: "#A39B95",
  },
  detailValue: {
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 16,
    color: "#FFFFFF",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  voidButton: {
    flex: 1,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
  },
  voidButtonText: {
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 18,
    color: "#FD3C4A",
  },
  editButton: {
    flex: 1,
    height: 60,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  editButtonText: {
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 18,
    color: "#1C1816",
  },
});
