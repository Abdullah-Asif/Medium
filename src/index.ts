import express, { Request, Response } from 'express';
import { userRoute } from './webApi/routes/userRoute';
import dotenv from 'dotenv';
import {Database} from "./infrastructure/dbConfig";

dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT;
const database = new Database();
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript Express!');
});
app.use('/user', userRoute)
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
