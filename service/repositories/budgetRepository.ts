import { db } from "@/db";
import { savingsTable, transactionsTable } from "@/db/schema";
import { Saving } from "@/types/savings/savings.type";
import { TransactionDetails } from "@/types/transactions/transactions.type";
import { and, eq, sql } from "drizzle-orm";
import { nanoid } from "nanoid";

function generateId(x: string) {
  return x + "-" + nanoid();
}

export async function createBugdet(data: Saving, userId: string) {
  const budget = await db
    .insert(savingsTable)
    .values({
      ...data,
      id: generateId("budget"),
      user_id: userId,
    })
    .returning();

  const transactionDetails: TransactionDetails = {
    user_id: userId,
    account: data.account || "",
    category: data.saving_category || "",
  };

  await calculateCurrentAmount(transactionDetails);

  return budget;
}

export async function editBudget(
  id: string,
  data: Partial<Saving>,
  userId: string,
) {
  const budget = await db
    .update(savingsTable)
    .set(data)
    .where(and(eq(savingsTable.id, id), eq(savingsTable.user_id, userId)))
    .returning();

  const transactionDetails: TransactionDetails = {
    user_id: userId,
    account: data.account || "",
    category: data.saving_category || "",
  };

  await calculateCurrentAmount(transactionDetails);

  return budget;
}

export async function getAllBudgets(userId: string, limits: string) {
  const limit_val = parseFloat(limits);

  const budgets = db
    .select()
    .from(savingsTable)
    .where(eq(savingsTable.user_id, userId));

  if (typeof limit_val === "number") {
    budgets.limit(limit_val);
  }
  return budgets;
}

export async function getOneBudgetById(id: string, userId: string) {
  const budget = await db
    .select()
    .from(savingsTable)
    .where(and(eq(savingsTable.id, id), eq(savingsTable.user_id, userId)));

  return budget;
}

export async function deleteBudget(id: string, userId: string) {
  const budget = await db
    .delete(savingsTable)
    .where(and(eq(savingsTable.id, id), eq(savingsTable.user_id, userId)))
    .returning();

  return budget;
}

export async function calculateCurrentAmount(data: TransactionDetails) {
  const results = await db
    .select({
      income: sql<number>`COALESCE(sum(case when transaction_type = 'Income' and transaction_category = ${data.category} then amount else 0 end), 0)`,
      expense: sql<number>`COALESCE(sum(case when transaction_type = 'Expense' and transaction_category = ${data.category} then amount else 0 end), 0)`,
      transferred: sql<number>`COALESCE(sum(case when transaction_type = 'Transfer' and transaction_account = ${data.account} and transaction_category = ${data.category} then amount else 0 end), 0)`,
      received: sql<number>`COALESCE(sum(case when transaction_type = 'Transfer' and receiving_account = ${data.account} and transaction_category = ${data.category} then amount else 0 end), 0)`,
      fee: sql<number>`COALESCE(sum(case when transaction_type = 'Transfer' and transaction_account = ${data.account} and transaction_category = ${data.category} then fee else 0 end), 0)`,
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
    .update(savingsTable)
    .set({
      current_amount: sql`${savingsTable.initial_amount} + ${finalTotal}`,
    })
    .where(
      and(
        eq(savingsTable.user_id, data.user_id),
        eq(savingsTable.account, data.account),
        eq(savingsTable.saving_category, data.category),
      ),
    );
}
