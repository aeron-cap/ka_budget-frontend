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
      ...data,
      id: generateId("transaction"),
      user_id: userId,
    })
    .returning();

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

export async function getOneTransaction(id: string, userId: string) {
  const transaction = db
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

  return transaction;
}
