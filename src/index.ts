import express, { Request, Response } from 'express';
import { userRoute } from './webApi/routes/userRoute';
import {Database} from "./infrastructure/dbConfig";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT;
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript Express!');
});

const database = new Database();
app.use('/user', userRoute)
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
