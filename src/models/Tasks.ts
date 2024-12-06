import { Schema, model, Document, Types } from 'mongoose';

// Définir une interface
interface ITasks extends Document {
    projectId: Types.ObjectId;
    title: string;
    done: boolean;
    dueDate: Date;
}

// Définir notre schéma
const taskSchema = new Schema<ITasks>({
    projectId: { type: Schema.Types.ObjectId, required: true, ref: 'Projects'},
    title: { type: String, required: true },
    done: { type: Boolean, required: true, default: false },
    dueDate: { type: Date, required: false }
});

// Créer notre modèle
const Task = model<ITasks>('Task', taskSchema);

export default Task;