import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

export interface ProjectStopwatchesTable {
  id: Generated<number>;
  project_id: number;
  start: Date;
  stop: Date | null;
  created_at: ColumnType<Date, never, never>;
  updated_at: ColumnType<Date, never, never>;
}

export type ProjectStopwatch = Selectable<ProjectStopwatchesTable>;
export type NewProjectStopwatch = Insertable<ProjectStopwatchesTable>;
export type ProjectStopwatchUpdate = Updateable<ProjectStopwatchesTable>;
