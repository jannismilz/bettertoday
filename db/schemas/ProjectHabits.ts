import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

export interface ProjectHabitsTable {
  id: Generated<number>;
  project_id: number;
  weekdays: string[];
  frequency: number;
  created_at: ColumnType<Date, never, never>;
  updated_at: ColumnType<Date, never, never>;
}

export type ProjectHabit = Selectable<ProjectHabitsTable>;
export type NewProjectHabit = Insertable<ProjectHabitsTable>;
export type ProjectHabitUpdate = Updateable<ProjectHabitsTable>;
