import { db } from "@/db";
import { savingsTable, transactionsTable } from "@/db/schema";
import { Saving } from "@/types/savings/savings.type";
import { TransactionDetails } from "@/types/transactions/transactions.type";
import { and, eq, sql, sum } from "drizzle-orm";
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
  const incomeTotal = await db
    .select({ value: sum(transactionsTable.amount) })
    .from(transactionsTable)
    .where(
      and(
        eq(transactionsTable.transaction_type, "Income"),
        eq(transactionsTable.transaction_account, data.account),
        eq(transactionsTable.user_id, data.user_id),
        eq(transactionsTable.transaction_category, data.category),
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
        eq(transactionsTable.transaction_category, data.category),
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
        eq(transactionsTable.receiving_category, data.category),
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
        eq(transactionsTable.transaction_category, data.category),
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
        eq(transactionsTable.transaction_category, data.category),
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
    .update(savingsTable)
    .set({
      current_amount: sql`${savingsTable.current_amount} + ${finalBalance}`,
    })
    .where(
      and(
        eq(savingsTable.user_id, data.user_id),
        eq(savingsTable.account, data.account),
        eq(savingsTable.saving_category, data.category),
      ),
    );
}
