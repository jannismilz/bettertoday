import { createPool } from "mysql2";
import { Kysely, MysqlDialect } from "kysely";
import { UsersTable } from "./schemas/Users.ts";
import { ProjectsTable } from "./schemas/Projects.ts";
import { ProjectStopwatchesTable } from "./schemas/ProjectStopwatches.ts";
import { ProjectStopwatchResetsTable } from "./schemas/ProjectStopwatchResets.ts";
import { ProjectTodosTable } from "./schemas/ProjectTodos.ts";
import { ProjectHabitsTable } from "./schemas/ProjectHabits.ts";
import { ProjectCountersTable } from "./schemas/ProjectCounters.ts";
import { ProjectDeadlinesTable } from "./schemas/ProjectDeadlines.ts";
import { SharedViewsTable } from "./schemas/SharedViews.ts";
import { SharedViewProjectsTable } from "./schemas/SharedViewProjects.ts";

interface Database {
  users: UsersTable;
  projects: ProjectsTable;
  project_stopwatches: ProjectStopwatchesTable;
  project_stopwatch_resets: ProjectStopwatchResetsTable;
  project_todos: ProjectTodosTable;
  project_habits: ProjectHabitsTable;
  project_counters: ProjectCountersTable;
  project_deadlines: ProjectDeadlinesTable;
  shared_views: SharedViewsTable;
  shared_dashboard_projects: SharedViewProjectsTable;
}

const dialect = new MysqlDialect({
  pool: createPool({
    database:
      process.env.APP_ENV === "development" ? "development" : "bettertoday",
    host: "database",
    user: process.env.APP_ENV === "development" ? "root" : process.env.DB_USER,
    password: process.env.DB_PASSWORD || "",
    port: 3306,
    connectionLimit: 10,
  }),
});

export const db = new Kysely<Database>({
  dialect,
});
