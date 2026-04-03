import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { User } from "@/types/users/users.type";
import { and, eq } from "drizzle-orm";

export async function createUser(data: User) {
  const user = await db
    .insert(usersTable)
    .values({
      randId: data.id,
      name: data.name,
      userString: data.userString,
    })
    .returning();
  return user;
}

export async function getUser(randId: string, name: string) {
  const user = db
    .select()
    .from(usersTable)
    .where(and(eq(usersTable.randId, randId), eq(usersTable.name, name)))
    .get();
  return user;
}

export async function getUserUsingName(name: string) {
  const user = db
    .select()
    .from(usersTable)
    .where(eq(usersTable.name, name))
    .get();
  return user;
}
