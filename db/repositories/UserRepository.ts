import { db } from "../db";
import { NewUser } from "../schemas/Users";

export async function upsertUser(user: NewUser) {
  const userExists = await db.selectFrom("users").selectAll().where("email", "=", user.email).executeTakeFirst()
  console.log(userExists);


  if (userExists) {
    const res = await db.updateTable("users").set(user).where("email", "=", user.email).executeTakeFirst()
    console.log(res);
  }

  const res = await db.insertInto("users").values(user).executeTakeFirst()
  console.log(res);
}
