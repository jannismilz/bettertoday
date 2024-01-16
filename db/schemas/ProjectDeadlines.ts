import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

export interface ProjectDeadlinesTable {
  id: Generated<number>;
  project_id: number;
  end: Date;
  created_at: ColumnType<Date, never, never>;
  updated_at: ColumnType<Date, never, never>;
}

export type ProjectDeadline = Selectable<ProjectDeadlinesTable>;
export type NewProjectDeadline = Insertable<ProjectDeadlinesTable>;
export type ProjectDeadlineUpdate = Updateable<ProjectDeadlinesTable>;
