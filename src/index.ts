import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { useRoutes } from './routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
useRoutes(app);

app.listen(PORT, () => console.log('Server is on port:', PORT));