import { db } from "../db";
import { NewUser } from "../schemas/Users";

export async function upsertUser(user: NewUser) {
  const userExists = await db.selectFrom("users").where("email", "=", user.email).executeTakeFirst()

  if (userExists) return await db.updateTable("users").set(user).where("email", "=", user.email).executeTakeFirst()

  return await db.insertInto("users").values(user).executeTakeFirst()
}
