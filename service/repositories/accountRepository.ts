import { db } from "@/db";
import { accountsTable, transactionsTable } from "@/db/schema";
import { Account } from "@/types/accounts/accounts.type";
import { TransactionDetails } from "@/types/transactions/transactions.type";
import { and, eq, sql, sum } from "drizzle-orm";
import { nanoid } from "nanoid";

function generateId(x: string) {
  return x + "-" + nanoid();
}

export async function createAccount(data: Account, userId: string) {
  const account = await db
    .insert(accountsTable)
    .values({
      ...data,
      id: generateId("account"),
      user_id: userId,
    })
    .returning();

  return account;
}

export async function editAccount(
  id: string,
  data: Partial<Account>,
  userId: string,
) {
  const account = await db
    .update(accountsTable)
    .set(data)
    .where(and(eq(accountsTable.id, id), eq(accountsTable.user_id, userId)))
    .returning();

  return account;
}

export async function getAllAccounts(userId: string, limits: string) {
  const limit_val = parseFloat(limits);

  const accounts = db
    .select()
    .from(accountsTable)
    .where(eq(accountsTable.user_id, userId));

  if (typeof limit_val === "number") {
    accounts.limit(limit_val);
  }

  return accounts;
}

export function getOneAccount(id: string, userId: string) {
  const account = db
    .select()
    .from(accountsTable)
    .where(and(eq(accountsTable.id, id), eq(accountsTable.user_id, userId)))
    .get();

  return account;
}

export async function deleteAccount(id: string, userId: string) {
  const account = await db
    .delete(accountsTable)
    .where(and(eq(accountsTable.id, id), eq(accountsTable.user_id, userId)))
    .returning();

  return account;
}

export async function calculateCurrentBalance(data: TransactionDetails) {
  const incomeTotal = await db
    .select({ value: sum(transactionsTable.amount) })
    .from(transactionsTable)
    .where(
      and(
        eq(transactionsTable.transaction_type, "Income"),
        eq(transactionsTable.transaction_account, data.account),
        eq(transactionsTable.user_id, data.user_id),
      ),
    );

  const expenseTotal = await db
    .select({ value: sum(transactionsTable.amount) })
    .from(transactionsTable)
    .where(
      and(
        eq(transactionsTable.transaction_type, "Expense"),
        eq(transactionsTable.transaction_account, data.account),
        eq(transactionsTable.user_id, data.user_id),
      ),
    );

  const receivingTotal = await db
    .select({ value: sum(transactionsTable.amount) })
    .from(transactionsTable)
    .where(
      and(
        eq(transactionsTable.transaction_type, "Transfer"),
        eq(transactionsTable.receiving_account, data.account),
        eq(transactionsTable.user_id, data.user_id),
      ),
    );

  const transferringTotal = await db
    .select({ value: sum(transactionsTable.amount) })
    .from(transactionsTable)
    .where(
      and(
        eq(transactionsTable.transaction_type, "Transfer"),
        eq(transactionsTable.transaction_account, data.account),
        eq(transactionsTable.user_id, data.user_id),
      ),
    );

  const feeTotal = await db
    .select({ value: sum(transactionsTable.fee) })
    .from(transactionsTable)
    .where(
      and(
        eq(transactionsTable.transaction_type, "Transfer"),
        eq(transactionsTable.transaction_account, data.account),
        eq(transactionsTable.user_id, data.user_id),
      ),
    );

  const formatSum = (result: { value: string | number | null }[]) => {
    return parseFloat(result[0]?.value?.toString() || "0");
  };

  const income = formatSum(incomeTotal);
  const expense = formatSum(expenseTotal);
  const received = formatSum(receivingTotal);
  const sent = formatSum(transferringTotal);
  const fee = formatSum(feeTotal);

  const finalBalance = income + received - (expense + sent) - fee;

  await db
    .update(accountsTable)
    .set({
      current_balance: sql`(${accountsTable.initial_balance} + ${finalBalance})`,
    })
    .where(
      and(
        eq(accountsTable.user_id, data.user_id),
        eq(accountsTable.name, data.account),
      ),
    );
}
