import { categoryIconsAndTypes } from "@/constants/uiElements";
import { Transaction } from "@/types/transactions/transactions.type";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
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

export default function TransactionDetailsModal({
  isVisible,
  onClose,
  transaction,
}: TransactionDetailsModalProps) {
  const [renderModal, setRenderModal] = useState(isVisible);
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

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
  const amountColor = isIncome ? "#10B981" : "#0F172A";
  const iconBgColor = isIncome ? "#ECFDF5" : "#FEF2F2";
  const iconColor = isIncome ? "#10B981" : "#EF4444";

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

  const getIcon = (name: string) => {
    if (name in categoryIconsAndTypes) {
      return categoryIconsAndTypes[name].icon;
    }

    return "cash-outline";
  };

  return (
    <Modal
      visible={renderModal}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.modalWrapper}>
        <Animated.View style={[StyleSheet.absoluteFill, { opacity: fadeAnim }]}>
          <BlurView
            intensity={60}
            tint="dark"
            style={StyleSheet.absoluteFill}
          />
          <TouchableOpacity
            style={styles.dismissArea}
            activeOpacity={1}
            onPress={onClose}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.modalContent,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          <View style={styles.headerContainer}>
            <View style={styles.handleBar} />
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={20} color="#64748B" />
            </TouchableOpacity>
          </View>

          <View style={styles.headerInfo}>
            <View
              style={[styles.iconContainer, { backgroundColor: iconBgColor }]}
            >
              <Ionicons
                name={getIcon(transaction.transaction_category)}
                size={32}
                color={iconColor}
              />
            </View>
            <Text style={[styles.amountText, { color: amountColor }]}>
              {amountPrefix}
              {transaction.amount}
            </Text>
            <Text>{transaction.note}</Text>
          </View>

          <View style={styles.detailsCard}>
            <View style={[styles.detailRow]}>
              <Text style={styles.detailLabel}>Date</Text>
              <Text style={styles.detailValue}>{dateTime}</Text>
            </View>

            <View style={[styles.detailRow]}>
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
            <TouchableOpacity style={styles.voidButton} activeOpacity={0.7}>
              <Text style={styles.voidButtonText}>Void</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editButton}
              activeOpacity={0.7}
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
  },
  dismissArea: {
    ...StyleSheet.absoluteFillObject,
  },
  keyboardAvoid: {
    width: "100%",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: "#CBD5E1",
    borderRadius: 2,
    marginBottom: 12,
  },
  closeButton: {
    position: "absolute",
    right: 0,
    top: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
  },
  headerInfo: {
    alignItems: "center",
    marginBottom: 14,
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },
  amountText: {
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 4,
  },
  payeeText: {
    fontSize: 16,
    color: "#64748B",
    fontWeight: "500",
  },
  detailsCard: {
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  lastDetailRow: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  detailLabel: {
    fontSize: 14,
    color: "#64748B",
    fontWeight: "500",
  },
  detailValue: {
    fontSize: 14,
    color: "#0F172A",
    fontWeight: "600",
  },
  statusCompleted: {
    color: "#10B981",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    gap: 16,
  },
  voidButton: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButton: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "red",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  voidButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "red",
  },
  editButton: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
  },
  saveButton: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "green",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
  },
  detailRowEdit: {
    alignItems: "center",
  },
  editInput: {
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#BFDBFE",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 14,
    color: "#1E293B",
    fontWeight: "600",
    minWidth: 150,
    textAlign: "right",
  },
  editAmountContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#BFDBFE",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginBottom: 8,
  },
  editAmountPrefix: {
    fontSize: 24,
    fontWeight: "800",
    marginRight: 4,
  },
  editAmountInput: {
    fontSize: 28,
    fontWeight: "800",
    minWidth: 100,
  },
  editPayeeInput: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F172A",
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#BFDBFE",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 6,
    minWidth: 180,
  },
});
