import { sql, Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable("shared_dashboards")
    .renameTo("shared_views")
    .execute();

  await db.schema
    .alterTable("shared_dashboard_projects")
    .renameTo("shared_view_projects")
    .execute();

  await db.schema
    .alterTable("shared_view_projects")
    .renameColumn("shared_dashboard_id", "shared_view_id")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable("shared_view_projects")
    .renameColumn("shared_view_id", "shared_dashboard_id")
    .execute();

  await db.schema
    .alterTable("shared_view_projects")
    .renameTo("shared_dashboard_projects")
    .execute();

  await db.schema
    .alterTable("shared_views")
    .renameTo("shared_dashboards")
    .execute();
}
