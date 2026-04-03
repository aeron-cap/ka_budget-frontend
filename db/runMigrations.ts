import migrations from "@/drizzle/migrations";
import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { migrate } from "drizzle-orm/expo-sqlite/migrator";

export async function runMigrations(db: ExpoSQLiteDatabase) {
  await migrate(db, migrations);
}
