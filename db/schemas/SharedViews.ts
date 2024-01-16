import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

export interface SharedViewsTable {
  id: Generated<number>;
  user_id: number;
  name: string;
  password: string | null;
  created_at: ColumnType<Date, never, never>;
  updated_at: ColumnType<Date, never, never>;
}

export type SharedView = Selectable<SharedViewsTable>;
export type NewSharedView = Insertable<SharedViewsTable>;
export type SharedViewUpdate = Updateable<SharedViewsTable>;
