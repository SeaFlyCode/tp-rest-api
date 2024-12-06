import { Request, Response } from "express";
import Project from "../models/Projects";
import Task from "../models/Tasks";

// Filtrer les projets par statut
export const filterProjects = async (req: Request, res: Response): Promise<any> => {
    try {
        const { status } = req.query;

        // Vérifiez que le statut est valide
        if (!['planned', 'in-progress', 'completed'].includes(status as string)) {
            return res.status(400).json({ message: "Les paramètres de filtres sont : status (planned | in-progress | completed)" });
        }

        const projects = await Project.find({ status });
        res.status(200).json(projects);
    } catch (error: any) {
        res.status(400).json({ message: error.message, error: "Les paramètres de filtres sont : status (planned | in-progress | completed)" });
    }
}

// Mettre à jour le statut d'un projet à "completed"
export const completeProject = async (req: Request, res: Response): Promise<any> => {
    try {
        const updates = { "status": "completed" };
        const { id } = req.params;
        const project = await Project.findByIdAndUpdate(id, updates, { new: true });

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.status(200).json({ message: 'Project updated successfully', project: project });
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
}

// Créer un nouveau projet
export const createProject = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, description, status } = req.body;

        if (!name || !description) {
            return res.status(400).json({
                message: 'Name and description are required'
            });
        }

        const newProject = new Project({ name, description, status });
        const savedProject = await newProject.save();
        res.status(201).json({
            message: 'Project created successfully',
            project: savedProject
        });
    } catch (error: any) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: 'Project already exists'
            });
        }
        console.log(error);
        return res.status(500).json({
            message: 'Error creating project',
            error: error.message
        });
    }
};

// Récupérer tous les projets
export const getAllProjects = async (req: Request, res: Response) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer un projet par son ID
export const getProjectById = async (req: Request, res: Response): Promise<any> => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(project);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};

// Mettre à jour un projet par son ID
export const updateProject = async (req: Request, res: Response): Promise<any> => {
    try {
        const updates = req.body;
        const { id } = req.params;
        const project = await Project.findByIdAndUpdate(id, updates, { new: true });

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.status(200).json({ message: 'Project updated successfully', project: project });
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};

// Supprimer un projet par son ID et supprimer toutes les tâches associées
export const deleteProject = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const project = await Project.findByIdAndDelete(id);
        await Task.deleteMany({ projectId: id }); // Supprimer toutes les tâches liées au projet

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.status(200).json({ message: 'Project deleted successfully', project: project });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};