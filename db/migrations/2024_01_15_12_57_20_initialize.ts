import { sql, Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("users")
    .ifNotExists()
    .addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
    .addColumn("firstname", "varchar", (col) => col.notNull())
    .addColumn("lastname", "varchar", (col) => col.notNull())
    .addColumn("email", "varchar", (col) => col.unique().notNull())
    .addColumn("avatar_url", "varchar")
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`).onUpdate("set default").notNull())
    .execute();

  await db.schema
    .createTable("projects")
    .ifNotExists()
    .addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
    .addColumn("user_id", "integer", (col) => col.references("users.id").notNull())
    .addColumn("name", "varchar", (col) => col.notNull())
    .addColumn("description", "varchar")
    .addColumn("cover_url", "varchar")
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`).onUpdate("set default").notNull())
    .execute();

  await db.schema
    .createTable("project_todos")
    .ifNotExists()
    .addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
    .addColumn("project_id", "integer", (col) => col.references("projects.id").notNull())
    .addColumn("todoist_project_id", "varchar", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`).onUpdate("set default").notNull())
    .execute();

  await db.schema
    .createTable("project_counters")
    .ifNotExists()
    .addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
    .addColumn("project_id", "integer", (col) => col.references("projects.id").notNull())
    .addColumn("goal", "float4", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`).onUpdate("set default").notNull())
    .execute();

  await db.schema
    .createTable("project_habits")
    .ifNotExists()
    .addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
    .addColumn("project_id", "integer", (col) => col.references("projects.id").notNull())
    .addColumn("weekdays", "json", (col) => col.notNull())
    .addColumn("frequency", "integer", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`).onUpdate("set default").notNull())
    .execute();

  await db.schema
    .createTable("project_deadlines")
    .ifNotExists()
    .addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
    .addColumn("project_id", "integer", (col) => col.references("projects.id").notNull())
    .addColumn("end", "timestamp", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`).onUpdate("set default").notNull())
    .execute();

  await db.schema
    .createTable("project_stopwatches")
    .ifNotExists()
    .addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
    .addColumn("project_id", "integer", (col) => col.references("projects.id").notNull())
    .addColumn("start", "timestamp", (col) => col.notNull())
    .addColumn("stop", "timestamp")
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`).onUpdate("set default").notNull())
    .execute();

  await db.schema
    .createTable("project_stopwatche_resets")
    .ifNotExists()
    .addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
    .addColumn("project_stopwatch_id", "integer", (col) => col.references("project_stopwatches.id").notNull())
    .addColumn("reset", "timestamp")
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`).onUpdate("set default").notNull())
    .execute();

  await db.schema
    .createTable("shared_dashboards")
    .ifNotExists()
    .addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
    .addColumn("user_id", "integer", (col) => col.references("users.id").notNull())
    .addColumn("name", "varchar", (col) => col.notNull())
    .addColumn("password", "varchar")
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`).onUpdate("set default").notNull())
    .execute();

  await db.schema
    .createTable("shared_dashboard_projects")
    .ifNotExists()
    .addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
    .addColumn("shared_dashboard_id", "integer", (col) => col.references("shared_dashboards.id").notNull())
    .addColumn("project_id", "integer", (col) => col.references("projects.id").notNull())
    .addColumn("next_project", "integer", (col) => col.references("projects.id"))
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`).onUpdate("set default").notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("users").execute()
  await db.schema.dropTable("projects").execute()
  await db.schema.dropTable("project_todos").execute()
  await db.schema.dropTable("project_counters").execute()
  await db.schema.dropTable("project_habits").execute()
  await db.schema.dropTable("project_deadlines").execute()
  await db.schema.dropTable("project_stopwatches").execute()
  await db.schema.dropTable("project_stopwatche_resets").execute()
  await db.schema.dropTable("shared_dashboards").execute()
  await db.schema.dropTable("shared_dashboard_projects").execute()
}
