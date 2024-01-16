import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

export interface ProjectTodosTable {
  id: Generated<number>;
  project_id: number;
  todoist_project_id: string;
  created_at: ColumnType<Date, never, never>;
  updated_at: ColumnType<Date, never, never>;
}

export type ProjectTodo = Selectable<ProjectTodosTable>;
export type NewProjectTodo = Insertable<ProjectTodosTable>;
export type ProjectTodoUpdate = Updateable<ProjectTodosTable>;
