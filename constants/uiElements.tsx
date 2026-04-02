import { AccountTypeName } from "@/types/entities/accountTypes.type";
import {
  CategoryDetail,
  CategoryName,
  TransactionType,
} from "@/types/entities/categories.type";
import { Ionicons } from "@expo/vector-icons";

const allTypes: TransactionType[] = [
  "Expense",
  "Income",
  "Transfer",
  "Investment",
];

export const categoryIconsAndTypes: Record<CategoryName, CategoryDetail> = {
  Business: { type: allTypes, icon: "business-outline" },
  Clothes: { type: allTypes, icon: "shirt-outline" },
  Debt: { type: allTypes, icon: "card-outline" },
  "Eat Out": { type: allTypes, icon: "restaurant-outline" },
  Electricity: { type: allTypes, icon: "flash-outline" },
  "Emergency Fund": { type: allTypes, icon: "shield-checkmark-outline" },
  Essentials: { type: allTypes, icon: "checkmark-circle-outline" },
  Food: { type: allTypes, icon: "fast-food-outline" },
  Gala: { type: allTypes, icon: "airplane-outline" },
  Gift: { type: allTypes, icon: "gift-outline" },
  Grocery: { type: allTypes, icon: "cart-outline" },
  Healthcare: { type: allTypes, icon: "medical-outline" },
  Internet: { type: allTypes, icon: "globe-outline" },
  Investments: { type: allTypes, icon: "trending-up-outline" },
  Leisure: { type: allTypes, icon: "game-controller-outline" },
  Load: { type: allTypes, icon: "phone-portrait-outline" },
  Loan: { type: allTypes, icon: "cash-outline" },
  Miscellaneous: { type: allTypes, icon: "ellipsis-horizontal-circle-outline" },
  "Mobile Data": { type: allTypes, icon: "cellular-outline" },
  MP2: { type: allTypes, icon: "stats-chart-outline" },
  "Non-Essentials": { type: allTypes, icon: "close-circle-outline" },
  "Online Bank": { type: allTypes, icon: "desktop-outline" },
  Pagibig: { type: allTypes, icon: "home-outline" },
  Philhealth: { type: allTypes, icon: "heart-half-outline" },
  Reimbursement: { type: allTypes, icon: "return-down-back-outline" },
  Salary: { type: allTypes, icon: "wallet-outline" },
  "Sanity Check": { type: allTypes, icon: "heart-outline" },
  "Saving Goal": { type: allTypes, icon: "flag-outline" },
  Savings: { type: allTypes, icon: "archive-outline" },
  "Side Hustle": { type: allTypes, icon: "hammer-outline" },
  "Sinking Fund": { type: allTypes, icon: "water-outline" },
  SSS: { type: allTypes, icon: "briefcase-outline" },
  Subscriptions: { type: allTypes, icon: "calendar-outline" },
  Transportation: { type: allTypes, icon: "car-outline" },
  Utilities: { type: allTypes, icon: "construct-outline" },
  "Utilities Payment": { type: ["Expense"], icon: "card-outline" },
};

export const accountTypeIcons: Record<
  AccountTypeName,
  keyof typeof Ionicons.glyphMap
> = {
  "Digital Bank": "globe-outline",
  "E-Wallet": "wallet-outline",
  Investments: "trending-up-outline",
  Loan: "cash-outline",
  "Physical Bank": "business-outline",
  "Credit Card": "card-outline",
  Cash: "cash-outline",
};
