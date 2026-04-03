import { sql } from "drizzle-orm";
import { integer, numeric, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
  id: integer().primaryKey({ autoIncrement: true }),
  randId: text().notNull(),
  name: text().notNull(),
  userString: text("user_string").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .$onUpdate(() => new Date()),
});

export const transactionsTable = sqliteTable("transactions", {
  id: text().primaryKey(),
  datetime: integer({ mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  transactionCategory: text("transaction_category").notNull(),
  amount: numeric().notNull(),
  note: text(),
  transactionType: text("transaction_type").notNull(),
  transactionAccount: text("transaction_account").notNull(),
  receivingAccount: text("receiving_account"),
  savingName: text("saving_name"),
  fee: numeric().default("0"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .$onUpdate(() => new Date()),
});

export const savingsTable = sqliteTable("savings", {
  id: text().primaryKey(),
  color: text().notNull(),
  name: text().notNull(),
  account: text().notNull(),
  currentAmount: numeric().notNull(),
  goalAmount: numeric().notNull(),
  savingCategory: text("saving_category").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .$onUpdate(() => new Date()),
});

export const accountsTable = sqliteTable("accounts", {
  id: text().primaryKey(),
  name: text().notNull(),
  accountType: text("account_type").notNull(),
  initialBalance: numeric().notNull().default("0"),
  currentBalance: numeric().default("0"),
  accountCategory: text("account_category").notNull(),
  color: text().notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .$onUpdate(() => new Date()),
});
