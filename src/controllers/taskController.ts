import { Request, Response } from "express";
import Task from "../models/Tasks";
import Project from "../models/Projects";

// Récupérer les tâches avant une date spécifique
export const getTaskByDueDate = async (req: Request, res: Response): Promise<any> => {  
    try {
        const { date } = req.query;

        if (!date) {
            return res.status(400).json({ message: 'Date query parameter is required' });
        }

        const tasks = await Task.find({ dueDate: { $lt: new Date(date as string) } });
        if (tasks.length === 0) {
            return res.status(404).json({ message: 'No tasks found' });
        }
        res.status(200).json(tasks);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};  

// Mettre à jour le statut d'une tâche à "done"
export const completedTask = async (req: Request, res: Response): Promise<any> => {
    try {
        const updates = { done: true };
        const { id } = req.params;
        const task = await Task.findByIdAndUpdate(id, updates, { new: true });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }   

        res.status(200).json({ message: 'Task updated and marked as completed successfully', task: task });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}                                                    

// Créer une nouvelle tâche
export const createTask = async (req: Request, res: Response): Promise<any> => {
    try {
        const { projectId, title, done, dueDate } = req.body;

        if (!projectId || !title) {
            return res.status(400).json({
                message: 'Project ID and title are required'
            });
        }

        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(400).json({
                message: 'ProjectId must be valid'
            });
        }

        const newTask = new Task({ projectId, title, done, dueDate });
        const savedTask = await newTask.save();
        res.status(201).json({
            message: 'Task created successfully',
            task: savedTask
        });
    } catch (error: any) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: 'Task already exists'
            });
        }
        console.log(error);
        return res.status(500).json({
            message: 'Error creating task',
            error: error.message
        });
    }
};

// Récupérer toutes les tâches
export const getAllTasks = async (req: Request, res: Response): Promise<any> => {
    try {
        if(req.query.projectId) {
            const tasks = await Task.find({ projectId: req.query.projectId });
            return res.status(200).json(tasks);
        }

        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer une tâche par son ID
export const getTaskById = async (req: Request, res: Response): Promise<any> => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour une tâche par son ID
export const updateTask = async (req: Request, res: Response): Promise<any> => {
    try {
        const updates = req.body;
        const { id } = req.params;
        const task = await Task.findByIdAndUpdate(id, updates, { new: true });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task updated successfully', task: task });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Supprimer une tâche par son ID
export const deleteTask = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndDelete(id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted successfully', task: task });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};