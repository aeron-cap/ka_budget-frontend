import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";

export const expo = openDatabaseSync("ka_budget_local.db");
export const db = drizzle(expo);
