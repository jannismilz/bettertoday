import { db } from "../db";
import { Person } from "../schemas/User";

export async function findPersonById(id: number) {
  return await db
    .selectFrom("person")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
}

export async function findPeople(criteria: Partial<Person>) {
  let query = db.selectFrom("person");

  if (criteria.id) {
    query = query.where("id", "=", criteria.id); // Kysely is immutable, you must re-assign!
  }

  if (criteria.first_name) {
    query = query.where("first_name", "=", criteria.first_name);
  }

  if (criteria.last_name !== undefined) {
    query = query.where(
      "last_name",
      criteria.last_name === null ? "is" : "=",
      criteria.last_name,
    );
  }

  if (criteria.gender) {
    query = query.where("gender", "=", criteria.gender);
  }

  if (criteria.created_at) {
    query = query.where("created_at", "=", criteria.created_at);
  }

  return await query.selectAll().execute();
}
