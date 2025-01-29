import { Request, Response } from "express";
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  changeTask,
} from "../models/taskModel";

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  const tasks = await getAllTasks();
  res.json(tasks);
};

export const addTask = async (req: Request, res: Response): Promise<void> => {
  const newTask = await createTask(req.body);
  res.status(201).json(newTask);
};

export const modifyTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const updatedTask = await updateTask(parseInt(id), req.body);
  res.json(updatedTask);
};

export const removeTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  await deleteTask(parseInt(id));
  res.status(204).send();
};

export const toogleTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const updatedTask = await changeTask(parseInt(id), req.body.completed);
    if (!updatedTask) {
      res.status(404).json({ error: "Task not found" });
      return;
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to complete task" });
  }
};
