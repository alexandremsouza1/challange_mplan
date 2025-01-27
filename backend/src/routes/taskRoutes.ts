import { Router } from "express";
import {
  getTasks,
  addTask,
  modifyTask,
  removeTask,
  completeTask,
} from "../controllers/taskController";

const router = Router();

router.get("/tasks", getTasks);
router.post("/tasks", addTask);
router.put("/tasks/:id", modifyTask);
router.delete("/tasks/:id", removeTask);
router.patch("/tasks/:id/done", completeTask);

export default router;
