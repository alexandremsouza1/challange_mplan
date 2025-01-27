import pool from "../config/database";

export interface Task {
  id?: number;
  title: string;
  description: string;
  completed: boolean;
}

export const getAllTasks = async (): Promise<Task[]> => {
  const result = await pool.query("SELECT * FROM tasks");
  return result.rows;
};

export const createTask = async (task: Task): Promise<Task> => {
  const { title, description, completed } = task;
  const result = await pool.query(
    "INSERT INTO tasks (title, description, completed) VALUES ($1, $2, $3) RETURNING *",
    [title, description, completed]
  );
  return result.rows[0];
};

export const updateTask = async (id: number, task: Task): Promise<Task> => {
  const { title, description, completed } = task;
  const result = await pool.query(
    "UPDATE tasks SET title = $1, description = $2, completed = $3 WHERE id = $4 RETURNING *",
    [title, description, completed, id]
  );
  return result.rows[0];
};

export const deleteTask = async (id: number): Promise<void> => {
  await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
};

export const markTaskAsDone = async (id: number): Promise<Task> => {
  const result = await pool.query(
    "UPDATE tasks SET completed = TRUE WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
