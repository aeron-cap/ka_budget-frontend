import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { User } from "@/types/users/users.type";
import { and, eq } from "drizzle-orm";

export async function createUser(data: User) {
  const user = await db
    .insert(usersTable)
    .values({
      rand_id: data.id,
      name: data.name,
      user_string: data.userString,
    })
    .returning();
  return user;
}

export async function getUser(randId: string, name: string) {
  const user = db
    .select()
    .from(usersTable)
    .where(and(eq(usersTable.rand_id, randId), eq(usersTable.name, name)))
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
