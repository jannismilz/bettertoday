import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

export interface ProjectStopwatchResetsTable {
  id: Generated<number>;
  project_stopwatch_id: number;
  reset: Date;
  created_at: ColumnType<Date, never, never>;
  updated_at: ColumnType<Date, never, never>;
}

export type ProjectStopwatchReset = Selectable<ProjectStopwatchResetsTable>;
export type NewProjectStopwatchReset = Insertable<ProjectStopwatchResetsTable>;
export type ProjectStopwatchResetUpdate = Updateable<ProjectStopwatchResetsTable>;
