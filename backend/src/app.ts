import express, { Express, Request, Response } from 'express';
import userRoutes from './routes/userRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
// app.use(/users, userRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World with TypeScript!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
