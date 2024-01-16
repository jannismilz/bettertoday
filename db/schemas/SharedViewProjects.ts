import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

export interface SharedViewProjectsTable {
  id: Generated<number>;
  shared_view_id: number;
  project_id: number;
  next_project: number;
  name: string;
  password: string | null;
  created_at: ColumnType<Date, never, never>;
  updated_at: ColumnType<Date, never, never>;
}

export type SharedViewProject = Selectable<SharedViewProjectsTable>;
export type NewSharedViewProject = Insertable<SharedViewProjectsTable>;
export type SharedViewProjectUpdate = Updateable<SharedViewProjectsTable>;
