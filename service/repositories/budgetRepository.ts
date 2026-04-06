import { db } from "@/db";
import { savingsTable } from "@/db/schema";
import { Saving } from "@/types/savings/savings.type";
import { and, eq } from "drizzle-orm";
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
