import { Router } from "express";
import { createTask, getTaskByDueDate, getAllTasks, getTaskById, updateTask, deleteTask, completedTask } from "../controllers/taskController";

const router = Router();

router.post('/tasks', createTask);
router.get('/tasks', getAllTasks);
router.get('/tasks/due-before', getTaskByDueDate);
router.get('/tasks/:id', getTaskById);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);
router.post('/tasks/:id/mark-done', completedTask);

export default router;  