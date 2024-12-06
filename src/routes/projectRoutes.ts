import { Router } from "express";
import { createProject, filterProjects, completeProject, getAllProjects, getProjectById, updateProject, deleteProject } from "../controllers/projectController";

const router = Router();

router.post('/projects', createProject);
router.get('/projects', getAllProjects);
router.get('/projects/by-status', filterProjects);
router.get('/projects/:id', getProjectById);
router.put('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject);
router.post('/projects/:id/complete', completeProject);

export default router;