import { categories } from "@/constants/categories";
import { Ionicons } from "@expo/vector-icons";

export const TransactionTypes = {
  Expense: "Expense",
  Income: "Income",
  Transfer: "Transfer",
  Investment: "Investment",
};

export type TransactionType =
  (typeof TransactionTypes)[keyof typeof TransactionTypes];

export type CategoryName = (typeof categories)[number];

export type CategoryDetail = {
  type: TransactionType[];
  icon: keyof typeof Ionicons.glyphMap;
};
