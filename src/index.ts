import express, { Request, Response } from 'express';
import { userRoute } from './webApi/routes/userRoute';
import { blogRoute } from "./webApi/routes/blogRoute";
import { authRoute} from "./webApi/routes/authRoute";
import dotenv from 'dotenv';
import {Database} from "./infrastructure/dbConfig";
import BlogController from "./webApi/controllers/blogController";

dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT;
const database = new Database();
app.get('/', (req: Request, res: Response) => {
    res.send('Hello Pants!!!!');
});
app.use('/users', userRoute);
app.use('/blogs', blogRoute);
app.use('/auth', authRoute);

//global exception middleware
//cors
//rate limiter

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
