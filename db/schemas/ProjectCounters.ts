import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

export interface ProjectCountersTable {
  id: Generated<number>;
  project_id: number;
  goal: number | null;
  created_at: ColumnType<Date, never, never>;
  updated_at: ColumnType<Date, never, never>;
}

export type ProjectCounter = Selectable<ProjectCountersTable>;
export type NewProjectCounter = Insertable<ProjectCountersTable>;
export type ProjectCounterUpdate = Updateable<ProjectCountersTable>;
