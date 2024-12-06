import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import taskRoutes from './routes/taskRoutes';
import projectRoutes from './routes/projectRoutes';
import dotenv from 'dotenv';
dotenv.config();

// Créer notre app
const app = express();
const PORT = 3000;

//Ajout de la gestion de JSON
app.use(express.json());

// Ajout des routes
app.use('/', taskRoutes);
app.use('/', projectRoutes);

// Ajout de la connection mongoose
const uri = process.env.MONGO_URI;
mongoose.connect(uri as string)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB', error)
    })

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})