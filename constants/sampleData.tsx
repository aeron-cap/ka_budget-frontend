import { Saving } from "@/types/savings/savings.type";
import { Transaction } from "@/types/transactions/transactions.type";

export const transactions: Transaction[] = [
  {
    id: "txn_8a7b6c5d4e",
    datetime: new Date("2026-03-24T12:30:00Z"),
    transaction_category: "Groceries",
    amount: "85.5", // String
    note: "Weekly restock",
    transaction_type: "Expense",
    transaction_account: "Credit Card", // Corrected key
    receiving_account: null,
    fee: "0", // String
    icon: "desktop", // Corrected key
    user_id: "10232", // String
    created_at: new Date("2026-03-24T12:35:00Z"),
    updated_at: new Date("2026-03-24T12:35:00Z"),
  },
  {
    id: "txn_1f2e3d4c5b",
    datetime: new Date("2026-03-23T09:00:00Z"),
    transaction_category: "Salary",
    amount: "3500.0",
    note: "March First Half",
    transaction_type: "Income",
    transaction_account: "Checking",
    receiving_account: null,
    fee: null,
    icon: "desktop",
    user_id: "10232",
    created_at: new Date("2026-03-23T09:05:00Z"),
    updated_at: new Date("2026-03-23T09:05:00Z"),
  },
  {
    id: "txn_9q8w7e6r5t",
    datetime: new Date("2026-03-22T15:45:00Z"),
    transaction_category: "Internal Transfer",
    amount: "500.0",
    note: "Emergency fund allocation",
    transaction_type: "Transfer",
    transaction_account: "Checking",
    receiving_account: "Savings",
    fee: "1.5",
    icon: "desktop",
    user_id: "10232",
    created_at: new Date("2026-03-22T15:46:00Z"),
    updated_at: new Date("2026-03-22T15:46:00Z"),
  },
];

export const SAMPLE_SAVINGS: Saving[] = [
  {
    id: "789e4567-e89b-12d3-a456-426614174000",
    color: "#4CAF50",
    description: "Emergency Fund",
    account: "Main Savings",
    current_amount: "15000",
    goal_amount: "50000",
    saving_category: "Salary",
    icon: "wallet",
  },
  {
    id: "789e4567-e89b-12d3-a456-426614174001",
    color: "#2196F3",
    description: "New Laptop",
    account: "Digital Wallet",
    current_amount: "1200.5",
    goal_amount: "2500",
    saving_category: "Shopping",
    icon: "laptop",
  },
  {
    id: "789e4567-e89b-12d3-a456-426614174002",
    color: "#FFC107",
    description: "Vacation Trip",
    account: "Travel Fund",
    current_amount: "300",
    goal_amount: "5000",
    saving_category: "Entertainment",
    icon: "airplane",
  },
  {
    id: "789e4567-e89b-12d3-a456-426614174003",
    color: "#E91E63",
    description: "Car Downpayment",
    account: "Main Savings",
    current_amount: "25000",
    goal_amount: "100000",
    saving_category: "Transport",
    icon: "car",
  },
  {
    id: "789e4567-e89b-12d3-a456-426614174004",
    color: "#9C27B0",
    description: "Christmas Gifts",
    account: "Cash",
    current_amount: "500",
    goal_amount: "1000",
    saving_category: "Shopping",
    icon: "gift",
  },
];
