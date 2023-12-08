import express, { Request, Response } from 'express';
import { userRoute } from './webApi/routes/userRoute';
import { blogRoute } from "./webApi/routes/blogRoute";
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
app.use('/user', userRoute);
app.use('/blog', blogRoute);
app.get('/users/:username/blogs', BlogController.getBlogsByUserName);
app.post('/users/:username/blogs', BlogController.createBlog);
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
