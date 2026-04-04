import { db } from "@/db";
import { transactionsTable } from "@/db/schema";
import { Transaction } from "@/types/transactions/transactions.type";
import { and, desc, eq } from "drizzle-orm";
import { nanoid } from "nanoid";

function generateId(x: string) {
  return x + "-" + nanoid();
}

export async function createTransaction(data: Transaction, userId: string) {
  const transaction = await db
    .insert(transactionsTable)
    .values({
      id: generateId("transaction"),
      datetime: data.datetime,
      transactionCategory: data.transaction_category,
      amount: data.amount,
      note: data.note,
      transactionType: data.transaction_type,
      transactionAccount: data.transaction_account,
      receivingAccount: data.receiving_account,
      savingName: data.saving_name,
      fee: data.fee,
      userId: userId,
    })
    .returning();

  return transaction;
}

export async function getAllTransactions(userId: string) {
  const transactions = db
    .select()
    .from(transactionsTable)
    .where(eq(transactionsTable.userId, userId))
    .orderBy(desc(transactionsTable.datetime))
    .get();
  return transactions;
}

export async function getOneTransaction(id: string, userId: string) {
  const transaction = db
    .select()
    .from(transactionsTable)
    .where(
      and(eq(transactionsTable.id, id), eq(transactionsTable.userId, userId)),
    )
    .get();
  return transaction;
}
