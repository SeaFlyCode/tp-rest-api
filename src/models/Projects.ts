import {Schema, model, Document} from 'mongoose';

// Définir une interface
interface IProjects extends Document {
    name: string;
    description: string;
    status: 'planned' | 'in-progress' | 'completed';
    createdAt: Date;
}


// définir notre schéma
const projectSchema = new Schema<IProjects>({
    name: {type: String, required: true},
    description: {type: String, required: true},
    status: {type: String, required: true, enum: ['planned', 'in-progress', 'completed'], default: 'planned'},    
    createdAt: {type: Date, default: Date.now}  
})


// Créer notre model
const Projects = model<IProjects>('Projects', projectSchema);

export default Projects