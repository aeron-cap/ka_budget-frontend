import { sql } from "drizzle-orm";
import { integer, numeric, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
  id: integer().primaryKey({ autoIncrement: true }),
  rand_id: text().notNull(),
  name: text().notNull(),
  user_string: text("user_string").notNull(),
  created_at: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  updated_at: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .$onUpdate(() => new Date()),
});

export const transactionsTable = sqliteTable("transactions", {
  id: text().primaryKey(),
  datetime: integer({ mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  transaction_category: text("transaction_category").notNull(),
  amount: numeric().notNull(),
  note: text(),
  transaction_type: text("transaction_type").notNull(),
  transaction_account: text("transaction_account").notNull(),
  receiving_account: text("receiving_account"),
  receiving_category: text("receiving_category"),
  saving_name: text("saving_name"),
  fee: numeric().default("0"),
  created_at: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  updated_at: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .$onUpdate(() => new Date()),
  user_id: text("user_id").notNull(),
});

export const savingsTable = sqliteTable("savings", {
  id: text().primaryKey(),
  color: text().notNull(),
  name: text().notNull(),
  account: text().notNull(),
  initial_amount: numeric().notNull().default("0"),
  current_amount: numeric().notNull().default("0"),
  goal_amount: numeric().notNull(),
  saving_category: text("saving_category").notNull(),
  created_at: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  updated_at: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .$onUpdate(() => new Date()),
  user_id: text("user_id").notNull(),
});

export const accountsTable = sqliteTable("accounts", {
  id: text().primaryKey(),
  name: text().notNull(),
  account_type: text("account_type").notNull(),
  initial_balance: numeric().notNull().default("0"),
  current_balance: numeric().default("0"),
  account_category: text("account_category").notNull(),
  color: text().notNull(),
  created_at: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  updated_at: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .$onUpdate(() => new Date()),
  user_id: text("user_id").notNull(),
});

export const accountsInHomeTable = sqliteTable("accounts_in_home", {
  id: text().primaryKey(),
  account_id: text("account_id").notNull(),
  account_name: text("account_name").notNull(),
  user_id: text("user_id").notNull(),
});
