import { db } from "@/db";
import { transactionsTable } from "@/db/schema";
import {
  Transaction,
  TransactionDetails,
} from "@/types/transactions/transactions.type";
import { and, desc, eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { calculateCurrentBalance } from "./accountRepository";
import { calculateCurrentAmount } from "./budgetRepository";

function generateId(x: string) {
  return x + "-" + nanoid();
}

export async function createTransaction(data: Transaction, userId: string) {
  const transaction = await db
    .insert(transactionsTable)
    .values({
      ...data,
      id: generateId("transaction"),
      user_id: userId,
    })
    .returning();

  updateAccountBalances(transaction, userId);

  return transaction;
}

export async function editTransaction(
  id: string,
  data: Partial<Transaction>,
  userId: string,
) {
  const transaction = await db
    .update(transactionsTable)
    .set(data)
    .where(
      and(eq(transactionsTable.id, id), eq(transactionsTable.user_id, userId)),
    )
    .returning();

  updateAccountBalances(transaction, userId);

  return transaction;
}

export async function getAllTransactions(userId: string, limits: string) {
  const limit_val = parseFloat(limits);

  const transactions = db
    .select()
    .from(transactionsTable)
    .where(eq(transactionsTable.user_id, userId))
    .orderBy(desc(transactionsTable.datetime));

  if (typeof limit_val === "number") {
    transactions.limit(limit_val);
  }
  return transactions;
}

export async function getOneTransactionById(id: string, userId: string) {
  const transaction = await db
    .select()
    .from(transactionsTable)
    .where(
      and(eq(transactionsTable.id, id), eq(transactionsTable.user_id, userId)),
    );

  return transaction;
}

export async function deleteTransaction(id: string, userId: string) {
  const transaction = await db
    .delete(transactionsTable)
    .where(
      and(eq(transactionsTable.id, id), eq(transactionsTable.user_id, userId)),
    )
    .returning();

  updateAccountBalances(transaction, userId);

  return transaction;
}

export async function updateAccountBalances(
  transaction: Transaction[],
  userId: string,
) {
  const transactionData = transaction[0];
  const accounts: string[] = [];
  const categories: string[] = [];

  if (transactionData.transaction_type === "Transfer") {
    accounts.push(transactionData.transaction_account);
    accounts.push(transactionData.receiving_account ?? "");
    categories.push(transactionData.transaction_category);
    categories.push(transactionData.receiving_category ?? "");
  } else {
    accounts.push(transactionData.transaction_account);
    categories.push(transactionData.transaction_category);
  }

  accounts.forEach((account, index) => {
    const transactionDetails: TransactionDetails = {
      user_id: userId,
      account: account ?? "",
      amount: transactionData.amount,
      fee: transactionData.fee || "0",
      category: categories[index] ?? "",
    };

    calculateCurrentBalance(transactionDetails);
    calculateCurrentAmount(transactionDetails);
  });
}
