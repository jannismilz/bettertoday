import { db } from "../db";
import { NewUser } from "../schemas/Users";

export async function upsertUser(user: NewUser) {
  const userExists = await db
    .selectFrom("users")
    .selectAll()
    .where("email", "=", user.email)
    .executeTakeFirst();

  if (userExists) {
    return await db
      .updateTable("users")
      .set(user)
      .where("email", "=", user.email)
      .executeTakeFirst();
  }

  return await db.insertInto("users").values(user).executeTakeFirst();
}

export async function getUserByEmail(email: string) {
  return await db
    .selectFrom("users")
    .selectAll()
    .where("email", "=", email)
    .executeTakeFirst();
}
