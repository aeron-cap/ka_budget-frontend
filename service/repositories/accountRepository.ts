import { db } from "@/db";
import { accountsTable, transactionsTable } from "@/db/schema";
import { Account } from "@/types/accounts/accounts.type";
import { TransactionDetails } from "@/types/transactions/transactions.type";
import { and, eq, sql } from "drizzle-orm";
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

  const transactionDetails: TransactionDetails = {
    user_id: userId,
    account: data.name || "",
    category: "",
  };

  calculateCurrentBalance(transactionDetails);

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

  const transactionDetails: TransactionDetails = {
    user_id: userId,
    account: data.name || "",
    category: "",
  };

  calculateCurrentBalance(transactionDetails);

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

export async function getOneAccountById(id: string, userId: string) {
  const account = await db
    .select()
    .from(accountsTable)
    .where(and(eq(accountsTable.id, id), eq(accountsTable.user_id, userId)));

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
  const results = await db
    .select({
      income: sql<number>`COALESCE(sum(case when transaction_type = 'Income' and transaction_account = ${data.account} then amount else 0 end), 0)`,
      expense: sql<number>`COALESCE(sum(case when transaction_type = 'Expense'  and transaction_account = ${data.account} then amount else 0 end), 0)`,
      transferred: sql<number>`COALESCE(sum(case when transaction_type = 'Transfer' and transaction_account = ${data.account} then amount else 0 end), 0)`,
      received: sql<number>`COALESCE(sum(case when transaction_type = 'Transfer' and receiving_account = ${data.account} then amount else 0 end), 0)`,
      fee: sql<number>`COALESCE(sum(case when transaction_type = 'Transfer' and transaction_account = ${data.account} then fee else 0 end), 0)`,
    })
    .from(transactionsTable)
    .where(eq(transactionsTable.user_id, data.user_id));

  const { income, expense, transferred, received, fee } = results[0];

  const formatSum = (value: number) => {
    return value.toString() || "0";
  };

  const finalTotal =
    parseFloat(formatSum(income)) -
    parseFloat(formatSum(expense)) -
    parseFloat(formatSum(transferred)) +
    parseFloat(formatSum(received)) -
    parseFloat(formatSum(fee));

  await db
    .update(accountsTable)
    .set({
      current_balance: sql`(${accountsTable.initial_balance} + ${finalTotal})`,
    })
    .where(
      and(
        eq(accountsTable.user_id, data.user_id),
        eq(accountsTable.name, data.account),
      ),
    );
}

export async function getAccountsAndBalance(userId: string) {
  const accounts = await db
    .select()
    .from(accountsTable)
    .where(
      and(
        eq(accountsTable.user_id, userId),
        eq(accountsTable.show_in_home, true),
      ),
    );

  const total = await db
    .select({
      total_balance: sql<number>`COALESCE(sum(current_balance), 0)`,
    })
    .from(accountsTable)
    .where(
      and(
        eq(accountsTable.user_id, userId),
        eq(accountsTable.show_in_home, true),
      ),
    );

  return {
    accounts,
    total_balance: total[0].total_balance,
  };
}
